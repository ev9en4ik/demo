import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {modelParameters} from "./modalSlice";

const serverUrl = process.env.REACT_APP_SERVER_URL
export const getCountryById = createAsyncThunk(
    'prediction/getCountryById',
    async (id, { rejectWithValue , dispatch}) => {
        try {
            const response = await axios.get(
                serverUrl + `/country/country/${id}`
            )
            let country = response.data
            country.populations = JSON.parse(country.populations || '{}')
            country.arima_accuracy = JSON.parse(country.arima_accuracy || '{}')
            
            const parsedArimaParams = JSON.parse(country.arima_params || '[]')
            country.arima_params = {
                p: parsedArimaParams[0] || 0,
                d: parsedArimaParams[1] || 0,
                q: parsedArimaParams[2] || 0
            }
            
            country.arima_predictions = JSON.parse(country.arima_predictions || '[]')
            country.arima_previous_predictions = JSON.parse(country.arima_previous_predictions || '[]')
            country.arima_previous_predictions = country.arima_previous_predictions.map(item => {
                return {...item, year: item.year - 2 }
            });
            country.exp_smooth_accuracy = JSON.parse(country.exp_smooth_accuracy || '{}')
            country.exp_smooth_params = JSON.parse(country.exp_smooth_params || '{}')
            country.exp_smooth_predictions = JSON.parse(country.exp_smooth_predictions || '[]')
            country.exp_smooth_previous_predictions = JSON.parse(country.exp_smooth_previous_predictions || '[]')
            country.exp_smooth_previous_predictions = country.exp_smooth_previous_predictions.map(item => {
                return {...item, year: item.year - 2 }
            });
            dispatch(modelParameters({model: 'ARIMA', parameters: country.arima_params}))
            return country
            
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const makePredictWithCustomParameters = createAsyncThunk(
    'prediction/makePredictWithCustomParameters',
    async (data, { rejectWithValue}) => {
        try {
            const response = await axios.post(
                serverUrl + `/country/custom-predict`,
                data
            )
            const country = response.data
            let custom_model = [
                country.custom_model,
                country.custom_model === 'ExponentialSmoothing' ? JSON.parse(country.custom_params) :
                    {
                        p: JSON.parse(country.custom_params)[0] || 0,
                        d: JSON.parse(country.custom_params)[1] || 0,
                        q: JSON.parse(country.custom_params)[2] || 0
                    },
                JSON.parse(country.custom_accuracy),
                JSON.parse(country.custom_predictions)
            ]
            return custom_model
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)


const setError = (state, action) => {
    state.status = 'rejected'
    state.country = {}
    state.error = action.payload
    console.log(action.error.message)
}

const predictionSlice = createSlice({
    name: 'prediction',
    initialState: {
        country: {},
        status: null,
        error: null,
    },
    reducers: {
        exampleReducer: (state, action) => {
            console.log('state', state)
            console.log('action', action)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCountryById.pending, (state, action) => {
                    state.status = 'loading'
                    state.country = {}
                    state.error = null
                })
            .addCase(getCountryById.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.error = null
                state.country = action.payload
                modelParameters({model: 'ARIMA', parameters: action.payload.arima_params})
            })
            .addCase(getCountryById.rejected, setError)
            .addCase(makePredictWithCustomParameters.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(makePredictWithCustomParameters.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.error = null
                state.country.custom_model = action.payload[0]
                state.country.custom_params = action.payload[1]
                state.country.custom_accuracy = action.payload[2]
                state.country.custom_predictions = action.payload[3]
            })
            .addCase(makePredictWithCustomParameters.rejected, setError)
    },
})

export const { exampleReducer  } = predictionSlice.actions

export default predictionSlice.reducer