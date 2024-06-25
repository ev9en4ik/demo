import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {modelParameters} from "../../../store/reducers/modalSlice";
import {makePredictWithCustomParameters} from "../../../store/reducers/predictionSlice";

const ModelParameters = ({handleModal, predictPopulation}) => {
    const [model, setModel] = useState('ARIMA')
    const [arimaParameters, setArimaParameters] = useState({p: 0, d: 0, q: 0})
    const [expSmoothParameters, setExpSmoothParameters] = useState({smoothingLevel: 0, smoothingTrend: 0})
    const dispatch = useDispatch()
    const startModal = useSelector(state => state.modal.model)
    const secondaryModal = useSelector(state => state.prediction.country)
    
    useEffect(() => {
        if (startModal.model === 'ARIMA') {
            setModel(startModal.model)
            setArimaParameters({...startModal.parameters})
            setExpSmoothParameters({ smoothingLevel: secondaryModal.exp_smooth_params.smoothing_level, smoothingTrend: secondaryModal.exp_smooth_params.smoothing_trend})
        } else {
            setModel(startModal.model)
            setArimaParameters({...secondaryModal.country.arima_params})
            setExpSmoothParameters({ smoothingLevel: startModal.parameters.smoothing_level, smoothingTrend: startModal.parameters.smoothing_trend})
        }
    }, []);
    const handleModel = (e) => {
        setModel(e.target.innerText)
        if(e.target.innerText === 'ARIMA') {
            dispatch(modelParameters({model: e.target.innerText, parameters: arimaParameters}))
        }
    }
    
    const handleArimaParameters = (e) => {
        setArimaParameters({
            ...arimaParameters,
            [e.target.name]: e.target.value
        })
        dispatch(modelParameters({model: model, parameters: {...arimaParameters, [e.target.name]: e.target.value}}))
    }
    
    const handleExpSmoothParameters = (e) => {
        setExpSmoothParameters({
            ...expSmoothParameters,
            [e.target.name]: e.target.value
        })
        dispatch(modelParameters({model: model, parameters: {...expSmoothParameters, [e.target.name]: e.target.value}}))
    }
    const predict = () => {
        dispatch(makePredictWithCustomParameters({
            id: secondaryModal.id,
            model: model,
            order: arimaParameters,
            smoothing_level: expSmoothParameters.smoothingLevel,
            smoothing_trend: expSmoothParameters.smoothingTrend
        }))
        // predictPopulation()
        handleModal()
    }
    
    return (
        <div className='p-10 bg-zinc-800'>
            <div className='mb-4'>
                <h2 className='text-2xl font-semibold mb-4'>Choose model</h2>
                <div className='flex gap-3'>
                    <button
                        onClick={e => handleModel(e)}
                        style={{backgroundColor: model === 'ARIMA' ? '#374151' : 'transparent'}}
                        className='px-2 rounded-lg text-white hover:text-pink-300 ease-in-out duration-200 transition-colors'>
                        ARIMA
                    </button>
                    <button
                        onClick={e => handleModel(e)}
                        style={{backgroundColor: model === 'ExponentialSmoothing' ? '#374151' : 'transparent'}}
                        className='px-2 rounded-lg text-white hover:text-pink-300 ease-in-out duration-200 transition-colors'>
                        ExponentialSmoothing
                    </button>
                </div>
            </div>
            <div className='mb-4'>
                <h3>Set parameters</h3>
                {model === 'ARIMA' ?
                    <div>
                        <span>Order (</span>
                        <input className='bg-transparent w-[40px]'  name='p' onChange={e => handleArimaParameters(e)} value={arimaParameters.p} type="number" min='0' max='6'/>
                        <span>,</span>
                        <input className='bg-transparent w-[40px]'  name='d' onChange={e => handleArimaParameters(e)} value={arimaParameters.d}  type="number" min='0' max='2'/>
                        <span>,</span>
                        <input className='bg-transparent w-[40px]'  name='q' onChange={e => handleArimaParameters(e)} value={arimaParameters.q} type="number" min='0' max='6'/>
                        <span>)</span>
                    </div>
                    :
                    <div>
                        <span>Smoothing level (</span>
                        <input className='bg-transparent w-[40px]' onChange={e => handleExpSmoothParameters(e)} value={expSmoothParameters.smoothingLevel} name='smoothingLevel' type="number" step='0.1' min='0' max='1'/>
                        <span>)</span>
                        <br/>
                        <span>Smoothing trend (</span>
                        <input className='bg-transparent w-[40px]' onChange={e => handleExpSmoothParameters(e)} value={expSmoothParameters.smoothingTrend} name='smoothingTrend' type="number" step='0.1' min='0' max='1'/>
                        <span>)</span>
                    </div>
                }
            </div>
            <button onClick={predict}>Predict</button>
        </div>
    );
};

export default ModelParameters;