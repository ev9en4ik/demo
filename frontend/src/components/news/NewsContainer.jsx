import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import NewsItem from "./NewsItem";

const NewsContainer = ({news}) => {
    const generalNews = useSelector(state => state.news.news)
    const newsList = news || generalNews
    const [visibleItems, setVisibleItems] = React.useState(6)
    
    
    
    const handleLoadContent = () => {
        setVisibleItems(visibleItems + 3)
    }
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-wrap justify-around'>
                {
                    newsList.slice(0, visibleItems).map((item, index) => {
                        return <NewsItem key={index} news={item}/>
                    })
                }
            </div>
            {
                visibleItems <= newsList.length &&
                <button
                    onClick={handleLoadContent}
                    className='text-lg w-44 rounded-md bg-gradient-to-r from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500 transition-colors ease-in-out duration-200'>
                    See more
                </button>
            }
        </div>
    );
};

export default NewsContainer;