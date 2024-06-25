import React from 'react';

const NotFound = () => {
    return (
        <div className='flex justify-center w-screen h-screen bg-zinc-900'>
            <div className='flex flex-col justify-center items-center font-semibold gap-10 text-center text-gray-400'>
                <h1 className='text-5xl'>404 - Looks like you're lost</h1>
                
                <p>Maybe this page used to exist or you just spelled something wrong.<br/>
                    Chances are you spelled something wrong, so can you double click the URL?</p>
                
            </div>
        </div>
    );
};

export default NotFound;