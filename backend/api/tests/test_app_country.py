# test_app.py
import pytest
import httpx
from fastapi.testclient import TestClient
from app.main import app
from api.routes.country import Order, CustomPredict
# Create a TestClient instance
client = TestClient(app)

@pytest.mark.asyncio
async def test_get_countries():
    response = client.get('/country/all')
    assert response.status_code == 200
    countries = response.json()
    assert isinstance(countries, list)
    assert 'id' in countries[0]
    assert 'name' in countries[0]
    assert 'continent' in countries[0]
    assert 'populations' in countries[0]

@pytest.mark.asyncio
async def test_get_country():
    response = client.get('/country/country/USA')
    assert response.status_code == 200
    country = response.json()
    assert 'id' in country
    assert 'name' in country
    assert 'continent' in country
    assert 'populations' in country
    assert 'arima_predictions' in country
    assert 'arima_params' in country
    assert 'arima_accuracy' in country
    assert 'arima_previous_predictions' in country
    assert 'exp_smooth_predictions' in country
    assert 'exp_smooth_params' in country
    assert 'exp_smooth_accuracy' in country
    assert 'exp_smooth_previous_predictions' in country

@pytest.mark.asyncio
async def test_custom_predict_arima():
    predict = CustomPredict(
        id='USA',
        model='ARIMA',
        order=Order(p=1, d=1, q=1),
        smoothing_level=0.8,
        smoothing_trend=0.2
    )
    response = client.post('/country/custom-predict', json=predict.dict())
    assert response.status_code == 200
    result = response.json()
    assert 'custom_model' in result
    assert 'custom_predictions' in result
    assert 'custom_params' in result
    assert 'custom_accuracy' in result

@pytest.mark.asyncio
async def test_custom_predict_exp_smoothing():
    predict = CustomPredict(
        id='USA',
        model='ExponentialSmoothing',
        order=Order(p=1, d=1, q=1),
        smoothing_level=0.8,
        smoothing_trend=0.2
    )
    response = client.post('/country/custom-predict', json=predict.dict())
    assert response.status_code == 200
    result = response.json()
    assert 'custom_model' in result
    assert 'custom_predictions' in result
    assert 'custom_params' in result
    assert 'custom_accuracy' in result
