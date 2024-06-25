import React, {useEffect, useState} from 'react';
import PopulationChart from "./PopulationChart";
import ActionButtons from "./actionToolth/ActionButtons";
import ComparisonCountries from "./actionToolth/ComparisonCountries";
import {useSelector} from "react-redux";

const ChartContainer = ({tempCountry}) => {
    const [countriesForChart, setCountriesForChart] = useState([])
    const [predictionPopulation, setPredictionPopulation] = useState([])
    const [chartType, setChartType] = useState('line')
    const [country, setCountry] = useState(tempCountry)
    const prediction = useSelector(state => state.prediction.country)
    const [currentModel, setCurrentModel] = useState('ARIMA')
    
    useEffect( ()  => {
        const population = country.populations.map(item => {
            return {
                year: item.year,
                [country.name]: item.population
            }
        })
        setCountriesForChart(population)
        
    }, [])
    
    // useEffect(() => {
    //     if(prediction.status === 'resolved') {
    //         console.log(prediction)        }
    //     setCountry(prediction.country)
    // }, [prediction.status]);
    
    const handleChartType = (type) => {
        setChartType(type)
    }
    
    const handlePrediction = (model, button) => {
        if(button === 'close' && predictionPopulation.length !== 0) {
            return setPredictionPopulation([])
        }
        console.log(countriesForChart)
        if(model === 'ARIMA') {
            const list = countriesForChart.map((item, index) => {
                if(item.year === 2021)
                {
                    return {
                        ...item,
                        [`${country.name} (Previous prediction)`]: prediction.populations[index].population
                    }
                }
                if(item.year === 2022)
                {
                    return {
                        ...item,
                        [`${country.name} (Previous prediction)`]: prediction.arima_previous_predictions[0].population
                    }
                }
                if(item.year === 2023)
                {
                    return {
                        ...item,
                        [`${country.name} (Previous prediction)`]: prediction.arima_previous_predictions[1].population
                    }
                }
                return {
                    ...item,
                    [`${country.name} (Previous prediction)`]: null
                }
            })
            
            const prediction_list = prediction.arima_predictions.map(item => {
                return {
                    year: item.year,
                    [country.name]: item.population
                }
            })
            // console.log(list)
            setPredictionPopulation([...list, ...prediction_list])
            setCurrentModel('ARIMA')
        } else if(model === 'ExponentialSmoothing') {
            const list = countriesForChart.map((item, index) => {
                if(item.year === 2021)
                {
                    return {
                        ...item,
                        [`${country.name} (Previous prediction)`]: prediction.populations[index].population
                    }
                }
                if(item.year === 2022)
                {
                    return {
                        ...item,
                        [`${country.name} (Previous prediction)`]: prediction.exp_smooth_previous_predictions[0].population
                    }
                }
                if(item.year === 2023)
                {
                    return {
                        ...item,
                        [`${country.name} (Previous prediction)`]: prediction.exp_smooth_previous_predictions[1].population
                    }
                }
                return {
                    ...item,
                    [`${country.name} (Previous prediction)`]: null
                }
            })
            
            const prediction_list = prediction.exp_smooth_predictions.map(item => {
                return {
                    year: item.year,
                    [country.name]: item.population
                }
            })
            
            setPredictionPopulation([...list, ...prediction_list])
            setCurrentModel('ExponentialSmoothing')
        } else if(model === 'Custom model') {
            const list = prediction.custom_predictions.map(item => {
                return {
                    year: item.year,
                    [country.name]: item.population
                }
            })
            
            setPredictionPopulation([...countriesForChart, ...list])
            setCurrentModel('Custom model')
        }
    }
    
    const addCountryToChart = (newCountry) => {
        setCountriesForChart(countriesForChart.map(((item, index) => {
            return {
                ...item,
                [newCountry.name]: newCountry.populations[index].population
            }
        })))
    }
    
    const removeCountryFromChart = (newCountry) => {
        setCountriesForChart(countriesForChart.map(((item, index) => {
            delete item[newCountry.name]
            return item
        })))
    }
    return (
        <div className='mb-6'>
            <ActionButtons chartType={chartType} handleChartType={handleChartType} predictionPopulation={predictionPopulation} handlePrediction={handlePrediction}/>
            <div className='flex justify-center'>
                <PopulationChart chartType={chartType} data={predictionPopulation.length === 0 ? countriesForChart : predictionPopulation}/>
            </div>
            {predictionPopulation.length !== 0 &&
                <div className='ms-20 my-8'>
                    <h3> Model accuracy</h3>
                    <span>Current model: {currentModel}</span>
                    <br/>
                    { currentModel === 'ARIMA' &&
                        <div>
                            <span>Mean absolute error: {prediction.arima_accuracy.MAE}</span>
                            <br/>
                            {/*<span>Mean squared error: {prediction.arima_accuracy.MSE}</span>*/}
                            {/*<br/>*/}
                            <span>Mean absolute percentage error (%): {Number(prediction.arima_accuracy.MAPE).toFixed(3)}</span>
                        </div>
                    }
                    { currentModel === 'ExponentialSmoothing' &&
                        <div>
                            <span>Mean absolute error: {prediction.exp_smooth_accuracy.MAE}</span>
                            <br/>
                            {/*<span>Mean squared error: {prediction.exp_smooth_accuracy.MSE}</span>*/}
                            {/*<br/>*/}
                            <span>Mean absolute percentage error (%): {Number(prediction.exp_smooth_accuracy.MAPE).toFixed(3)}</span>
                        </div>
                    }
                    {currentModel === 'Custom model' && prediction.custom_model === 'ARIMA' &&
                        <div>
                            <span>Custom model {prediction.custom_model}</span>
                            <br/>
                            <span>Mean absolute error: {prediction.custom_accuracy.MAE}</span>
                            <br/>
                            {/*<span>Mean squared error: {prediction.custom_accuracy.MSE}</span>*/}
                            {/*<br/>*/}
                            <span>Mean absolute percentage error (%): {Number(prediction.custom_accuracy.MAPE).toFixed(3)}</span>
                        </div>
                    }
                    {currentModel === 'Custom model' && prediction.custom_model === 'ExponentialSmoothing' &&
                        <div>
                            <span>Custom model {prediction.custom_model}</span>
                            <br/>
                            <span>Mean absolute error: {prediction.custom_accuracy.MAE}</span>
                            <br/>
                            {/*<span>Mean squared error: {prediction.custom_accuracy.MSE}</span>*/}
                            {/*<br/>*/}
                            <span>Mean absolute percentage error (%): {Number(prediction.custom_accuracy.MAPE).toFixed(3)}</span>
                        </div>
                    }
                </div>
            }
            <ComparisonCountries defaultCountry={country} addCountryToChart={addCountryToChart}
                                 removeCountryFromChart={removeCountryFromChart}/>
        </div>
    );
};

export default ChartContainer;