import json
from fastapi import APIRouter
from pydantic import BaseModel
from api.models.predict import Predict
from api.models.country import Country
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from itertools import product
from pmdarima import auto_arima
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, mean_absolute_percentage_error
import warnings
from statsmodels.tools.sm_exceptions import ConvergenceWarning

country_router = APIRouter(prefix='/country', tags=['Country'])


class Order(BaseModel):
    p: int
    d: int
    q: int
class CustomPredict(BaseModel):
    id: str
    model: str
    order: Order
    smoothing_level: float
    smoothing_trend: float


@country_router.get('/all')
async def get_countries():
    # Read the dataset
    df = pd.read_csv('api/data/merged_world_population_data.csv')
    years = [col for col in df.columns if col.isdigit()]
    countries = []
    # Iterate over each row in the dataset
    for index, row in df.iterrows():
        # Create a new instance of the Country model
        country = Country(id=row['CCA3'], name=row['Country'], continent=row['Continent'])
        # Create a list of dictionaries for the populations field
        country_populations = row[years].values.flatten()

        country.populations = convert_populations(years, country_populations)
        countries.append(country)

    # print(countries[0].populations[0].year)
    # print(countries[0].populations)
    return countries


@country_router.get('/country/{id}')
async def get_country(id: str):
    # Read the dataset
    df = pd.read_csv('api/data/merged_world_population_data.csv')
    years = [col for col in df.columns if col.isdigit()]

    # Find the country with the given id
    country_row = df[df['CCA3'] == id.upper()]
    if country_row.empty:
        return {"message": "Country not found"}

    # Create a new instance of the Country model
    predict = Predict(id=country_row['CCA3'].iloc[0], name=country_row['Country'].iloc[0], continent=country_row['Continent'].iloc[0])
    # Create a list of dictionaries for the populations field
    country_populations = country_row[years].values.flatten()

    predict.populations = convert_populations(years, country_populations)

    predict.arima_predictions, predict.arima_params, predict.arima_accuracy = make_arima_predictions(country_populations)
    predict.arima_previous_predictions, x, y = make_arima_predictions(country_populations[:-2])

    predict.exp_smooth_predictions, predict.exp_smooth_params, predict.exp_smooth_accuracy = make_exp_smooth_predictions(country_populations)
    predict.exp_smooth_previous_predictions, x, y = make_exp_smooth_predictions(country_populations[:-2])
    return predict


@country_router.post('/custom-predict')
async def get_custom_predict(predict: CustomPredict):
    # print(predict)
    df = pd.read_csv('api/data/merged_world_population_data.csv')
    years = [col for col in df.columns if col.isdigit()]

    # Find the country with the given id
    country_row = df[df['CCA3'] == predict.id.upper()]
    if country_row.empty:
        return {"message": "Country not found"}

    # Create a list of dictionaries for the populations field
    country_populations = country_row[years].values.flatten()
    result = Predict()
    result.custom_model = predict.model
    if predict.model == 'ARIMA':
        order = (predict.order.p, predict.order.d, predict.order.q)
        result.custom_predictions, result.custom_params, result.custom_accuracy = make_arima_predictions(country_populations, order)
        # print(result.custom_predictions)
        # print(result.custom_params)
        # print(result.custom_accuracy)
    elif predict.model == 'ExponentialSmoothing':
        result.custom_predictions, result.custom_params, result.custom_accuracy = make_exp_smooth_predictions(country_populations, predict.smoothing_level, predict.smoothing_trend)
        # print(result.custom_predictions)
        # print(result.custom_params)
        # print(result.custom_accuracy)

    # print('-----')
    # print(result)
    return result


def convert_populations(years, country_populations):
    populations = []
    for i, year in enumerate(years):
        populations.append({
            'year': int(year),
            'population': int(country_populations[i])
        })

    return json.dumps(populations)


def make_arima_predictions(populations, order=None):

    if order is None:
        model = auto_arima(populations, trace=True, suppress_warnings=True)
        best_params = model.get_params()
        order = best_params['order']
        # print(order)

    # print(order)
    model_arima = ARIMA(populations, order=order)
    model_arima_fit = model_arima.fit()

    # Здійснюємо прогноз наступних 2 значень
    forecast_arima = model_arima_fit.forecast(2)
    forecast_arima = np.round(forecast_arima).astype(int)

    predictions = []
    for i, year in enumerate(range(2024, 2026)):
        predictions.append({
            'year': year,
            'population': int(forecast_arima[i])
        })

    # Обчислення точності (MAE і MSE)
    if len(populations) > 2:
        y_true = populations[-2:]
    else:
        y_true = populations

    mae = mean_absolute_error(y_true, forecast_arima[:len(y_true)])
    mse = mean_squared_error(y_true, forecast_arima[:len(y_true)])
    mape = mean_absolute_percentage_error(y_true, forecast_arima[:len(y_true)]) * 100

    accuracy = {
        "MAE": mae,
        "MSE": mse,
        "MAPE": mape
    }

    # Записуємо прогнози в поле predictions і повертаємо разом з параметрами та точністю
    return json.dumps(predictions), json.dumps(order), json.dumps(accuracy)


def make_exp_smooth_predictions(populations, smoothing_level=None, smoothing_trend=None):
    if smoothing_level is None and smoothing_trend is None:
        model_exp = ExponentialSmoothing(populations, trend='add')
        model_exp_fit = model_exp.fit(optimized=True)
        best_params = model_exp_fit.params
    else:
        model_exp = ExponentialSmoothing(populations, trend='add')
        model_exp_fit = model_exp.fit(smoothing_level=smoothing_level, smoothing_trend=smoothing_trend)
        best_params = model_exp_fit.params



    # Здійснюємо прогноз наступних 2 значень
    forecast_simple = model_exp_fit.forecast(2)
    forecast_simple = np.round(forecast_simple).astype(int)

    predictions = []
    for i, year in enumerate(range(2024, 2026)):
        predictions.append({
            'year': year,
            'population': int(forecast_simple[i])
        })

    # Обчислення точності (MAE і MSE)
    if len(populations) > 2:
        y_true = populations[-2:]
    else:
        y_true = populations

    mae = mean_absolute_error(y_true, forecast_simple)
    mse = mean_squared_error(y_true, forecast_simple)
    mape = mean_absolute_percentage_error(y_true, forecast_simple[:len(y_true)]) * 100

    accuracy = {
        "MAE": mae,
        "MSE": mse,
        "MAPE": mape
    }

    best_params_list = {k: round(v, 1) if isinstance(v, float) else v for k, v in best_params.items() if
                        k in ['smoothing_level', 'smoothing_trend']}
    return json.dumps(predictions), json.dumps(best_params_list), json.dumps(accuracy)
