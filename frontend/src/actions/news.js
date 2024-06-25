import axios from 'axios'
const serverUrl = process.env.REACT_APP_SERVER_URL

export const getNewsByCountryName = async name => {
    try {
        const response = await axios.get(
            serverUrl + `/news/country/${name}`
        )
        const news = response.data
        return news.articles.filter(item => item.title !== '[Removed]')
    } catch (e) {
        return e.response
    }
}

export const parseContent = async (url) => {
    try {
        const response = await axios.get(
            serverUrl + `/news/parse-content?url=${url}`
        )
        
        return response.data
    } catch (e) {
        return e.response
    }
}