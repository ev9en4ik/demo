import React, {useEffect, useState} from 'react';
import newsImg from "../../../assets/images/img.png";
import {parseContent} from "../../../actions/news";

const NewsInfo = ({news}) => {
    const [content, setContent] = useState('')
    
    useEffect( () => {
        const fetchParseContent = async () => {
            setContent(await parseContent(news.url))
        };
        
        fetchParseContent();
    }, [])
    return (
        <div className='bg-zinc-700 p-4 rounded-xl shadow-xl flex flex-col items-center overflow-y-scroll h-[650px]'>
            <div className='w-[850px] my-2'>
                {news.urlToImage ? (
                    <img className='rounded-2xl object-cover w-full' src={news.urlToImage} alt='image'/>
                ) : (
                    <img className='rounded-2xl object-cover inset-0 opacity-70 w-full' src={newsImg} alt='image'/>
                )}
            </div>
            <div className='bg-zinc-800 w-[620px] -translate-y-[50%] px-8 py-2 rounded-2xl'>
                <h3 className='text-lg font-semibold text-center text-white mb-4'>{news.title}</h3>
                <p className='text-center'>{news.description}</p>
            </div>
            <div className='w-[600px] indent-4 -translate-y-[5%]'>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default NewsInfo;