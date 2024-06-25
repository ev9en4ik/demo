import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const serverUrl = process.env.REACT_APP_SERVER_URL
export const fetchCountries = createAsyncThunk(
    'country/fetchCountries',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                serverUrl + '/country/all'
            )
            
            let countries = response.data
            countries = countries.map(country => {
                country.populations = JSON.parse(country.populations)
                return country
            })
            return countries
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.message)
        }
    }
)


const setError = (state, action) => {
    state.status = 'rejected'
    state.countries = []
    state.error = action.payload
    console.log(action.error.message)
}

const countrySlice = createSlice({
    name: 'country',
    initialState: {
        countries: [],
        currentCountry: {},
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
            .addCase(fetchCountries.pending, (state, action) => {
                state.status = 'loading'
                state.countries = []
                state.error = null
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.error = null
                state.countries = action.payload
            })
            .addCase(fetchCountries.rejected, setError)

    },
})

export const { exampleReducer } = countrySlice.actions
export default countrySlice.reducer
