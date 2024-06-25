import { configureStore } from '@reduxjs/toolkit'
import countryReducer from './reducers/countrySlice'
import newsReducer from './reducers/newsSlice'
import modalReducer from './reducers/modalSlice'
import predictionReducer from './reducers/predictionSlice'

export default configureStore({
    reducer: {
        country: countryReducer,
        news: newsReducer,
        modal: modalReducer,
        prediction: predictionReducer,
    },
})
