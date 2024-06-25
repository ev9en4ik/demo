import React, {useEffect, useState} from 'react';
import { ReactComponent as ChartLine } from "../../../../assets/icons/chart-line-up.svg";
import { ReactComponent as ChartPrediction } from "../../../../assets/icons/chart-line-up-down.svg";
import { ReactComponent as ChartColumn } from "../../../../assets/icons/chart-column.svg";
import { ReactComponent as ChartArea } from "../../../../assets/icons/chart-area.svg";
import { ReactComponent as Settings } from "../../../../assets/icons/gear.svg";
import Modal from "../../../modal/Modal";
import ModelParameters from "../../../modal/content/ModelParameters";
import {useSelector} from "react-redux";

const ActionButtons = ({chartType, handleChartType, predictionPopulation, handlePrediction}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [model, setModel] = useState('ARIMA')
    const predict = useSelector(state => state.prediction.country)
    
    useEffect(() => {
        console.log(predict)
    }, []);
    
    const handleModal = () => {
        setIsOpenModal(!isOpenModal)
    }
    
    const fetchPredictionData = (e) => {
        if(e.target.innerText === 'ARIMA') {
            setModel('ARIMA')
            return handlePrediction(e.target.innerText)
        }
        
        if(e.target.innerText === 'ExponentialSmoothing') {
            setModel('ExponentialSmoothing')
            return handlePrediction(e.target.innerText)
        }
        
        if(e.target.innerText === 'Custom model') {
            setModel('Custom model')
            return handlePrediction(e.target.innerText)
        }
        
        handlePrediction(model, 'close')
    }
    
    const predictWithCustomParameters = (model, parameters) => {
    
    }
    
    return (
        <div className='flex justify-between px-24 py-4'>
            <div className='flex justify-center gap-4'>
                <button
                    onClick={() => handleChartType('line')}
                    style={{fill: chartType === 'line' ? '#f9a8d4' : '#e5e7eb'}}
                    className='w-8 h-8 flex justify-center items-center rounded-lg hover:bg-gray-300/20 ease-in-out duration-200 transition-colors'>
                    <ChartLine width={22}/>
                </button>
                <button
                    onClick={() => handleChartType('column')}
                    style={{fill: chartType === 'column' ? '#f9a8d4' : '#e5e7eb'}}
                    className='w-8 h-8 flex justify-center items-center rounded-lg hover:bg-gray-300/20  ease-in-out duration-200 transition-colors'>
                    <ChartColumn width={22}/>
                </button>
                <button
                    onClick={() => handleChartType('area')}
                    style={{fill: chartType === 'area' ? '#f9a8d4' : '#e5e7eb'}}
                    className='w-8 h-8 flex justify-center items-center rounded-lg hover:bg-gray-300/20 ease-in-out duration-200 transition-colors'>
                    <ChartArea width={22}/>
                </button>
            </div>
            <div className='flex justify-center gap-4'>
                {
                    predictionPopulation.length !== 0 &&
                    <div className='flex gap-4'>
                        { predict.custom_model &&
                            <button
                                onClick={e => fetchPredictionData(e)}
                                style={{backgroundColor: model === 'Custom model' ? '#4b5563' : 'transparent'}}
                                className='px-2 opacity-25 rounded-lg text-gray-300 hover:text-pink-300 ease-in-out duration-200 transition-colors'>
                                Custom model
                            </button>
                        }
                        <button
                            onClick={e => fetchPredictionData(e)}
                            style={{backgroundColor: model === 'ARIMA' ? '#4b5563' : 'transparent'}}
                            className='px-2 opacity-25 rounded-lg text-gray-300 hover:text-pink-300 ease-in-out duration-200 transition-colors'>
                            ARIMA
                        </button>
                        <button
                            onClick={e => fetchPredictionData(e)}
                            style={{backgroundColor: model === 'ExponentialSmoothing' ? '#4b5563' : 'transparent'}}
                            className='px-2 opacity-25 rounded-lg text-gray-300 hover:text-pink-300 ease-in-out duration-200 transition-colors'>
                            ExponentialSmoothing
                        </button>
                    </div>
                    
                }
                <button
                    onClick={e => fetchPredictionData(e)}
                    style={{fill: predictionPopulation.length !== 0 ? '#f9a8d4' : '#e5e7eb'}}
                    className='w-8 h-8 flex justify-center items-center rounded-lg hover:bg-gray-300/20 ease-in-out duration-200 transition-colors'>
                    <ChartPrediction width={22}/>
                </button>
                <button
                    onClick={handleModal}
                    className='w-8 h-8 flex justify-center items-center rounded-lg fill-gray-300 hover:fill-pink-300 ease-in-out duration-200 transition-colors'>
                    <Settings width={22}/>
                </button>
                {
                    isOpenModal &&
                    <Modal handleModal={handleModal}>
                        <ModelParameters handleModal={handleModal} predictPopulation={predictWithCustomParameters} />
                    </Modal>
                }
            </div>
        </div>
    );
};

export default ActionButtons;