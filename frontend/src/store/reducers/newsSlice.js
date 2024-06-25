import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                serverUrl + '/news/all'
            )
 
            const news = response.data
            return news.articles.filter(item => item.title !== '[Removed]')
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.message)
        }
    }
)


const setError = (state, action) => {
    state.status = 'rejected'
    state.news = []
    state.error = action.payload
    console.log(action.error.message)
}

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: [],
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
            .addCase(fetchNews.pending, (state, action) => {
                state.status = 'loading'
                state.news = []
                state.error = null
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.error = null
                state.news = action.payload
            })
            .addCase(fetchNews.rejected, setError)
    },
})

export const { exampleReducer  } = newsSlice.actions

export default newsSlice.reducer