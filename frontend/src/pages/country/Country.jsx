import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NewsContainer from "../../components/news/NewsContainer";
import {getNewsByCountryName} from "../../actions/news";
import ChartContainer from "../../components/charts/populationChart/ChartContainer";
import {getCountryById} from "../../store/reducers/predictionSlice";

const Country = () => {
    const {id} = useParams()
    const [country, setCountry] = useState(useSelector(state => state.country.countries.find(item => item.id === id.toUpperCase())))
    const [news, setNews] = useState([])
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchData = async () => {
            setNews(await getNewsByCountryName(country.name))
        }

        fetchData()
    }, [])
    
    useEffect(() => {
        dispatch(getCountryById(id))
    }, []);
    
    return (
        <main className='px-48'>
            <p>{country.name}</p>
            <ChartContainer tempCountry={country}/>
            {news.length !== 0 && <NewsContainer news={news}/>}
        </main>
    );
};

export default Country;