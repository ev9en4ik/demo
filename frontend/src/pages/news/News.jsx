import React from 'react';
import NewsContainer from "../../components/news/NewsContainer";

const News = () => {
    return (
        <main className='mt-10 px-48'>
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl font-bold mb-4'>Latest News</h1>
                <p></p>
            </div>
            <NewsContainer/>
        </main>
    );
};

export default News;