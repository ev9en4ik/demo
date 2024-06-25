import {createSlice} from "@reduxjs/toolkit";

const setError = (state, action) => {
    state.status = 'rejected'
    state.news = []
    state.error = action.payload
    console.log(action.error.message)
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modals: [],
        model: {
            model: '',
            parameters: {},
        },
        status: null,
        error: null,
    },
    reducers: {
        modelParameters: (state, action) => {
            state.model.model = action.payload.model
            state.model.parameters = action.payload.parameters
        }
    },
    extraReducers: builder => {
    
    },
})

export const { modelParameters  } = modalSlice.actions

export default modalSlice.reducer