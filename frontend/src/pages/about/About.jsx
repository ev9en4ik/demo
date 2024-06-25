import React from 'react';
import { ReactComponent as Logo } from '../../assets/icons/earth-europe.svg';

const About = () => {
    return (
        <div
            className='flex flex-col justify-evenly items-center text-center text-white w-full h-3/4 bg-zinc-[750] absolute left-0'>
            <div className='w-2/5'>
                <h1 className='text-3xl font-bold text-gray-300 mb-6'>Demo situation</h1>
                <p className='text-base text-gray-400 mb-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Error exercitationem explicabo inventore laudantium recusandae, voluptatibus. Accusantium animi
                    aspernatur consectetur corporis dolor est ex fugiat illo ipsum, libero numquam ratione reiciendis
                    repudiandae saepe sed sint sunt tempore totam veniam voluptate?</p>
            </div>
            <div className='flex justify-center'>
                <Logo className='w-3/5 fill-gray-500'/>
            </div>
        </div>
    );
};

export default About;