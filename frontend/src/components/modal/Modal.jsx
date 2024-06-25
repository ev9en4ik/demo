import React from 'react';
import { ReactComponent as Close } from '../../assets/icons/xmark.svg';

const Modal = ({children, handleModal}) => {
    return (
        <div
            className="z-[999] fixed top-0 left-0 w-screen h-screen bg-zinc-900/75 flex justify-center items-center">
            {children}
            <button onClick={handleModal} className='absolute top-6 right-8 fill-gray-300 hover:fill-pink-300 ease-in-out duration-300 transition-colors'><Close width={20}/></button>
        
        </div>
    );
};

export default Modal;