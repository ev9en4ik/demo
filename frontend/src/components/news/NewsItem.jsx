import React, {useState} from 'react';
import { ReactComponent as Logo } from '../../assets/icons/earth-europe.svg';
import newsImg from '../../assets/images/img.png';
import Modal from "../modal/Modal";
import NewsInfo from "../modal/content/NewsInfo";
const NewsItem = ({news}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const date = new Date(news.publishedAt)
    const monthWord = date.toLocaleDateString('en-US', { month: 'long' })
    const day = date.getDate();
    const year = date.getFullYear();
    
    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    
    return (
        <div className='w-[30%] rounded-xl mb-10 bg-zinc-700 flex flex-col items-center box-border'>
            <div className='w-[90%] my-2'>
                {news.urlToImage ? (
                    <img className='rounded-lg object-cover w-full h-52' src={news.urlToImage} alt='image'/>
                ) : (
                    <img className='rounded-lg object-cover inset-0 opacity-70 w-full h-52' src={newsImg} alt='image'/>
                )}
            </div>
            <h3 className='text-sm w-[87%] my-2 whitespace-nowrap overflow-hidden text-ellipsis'>{news.title}</h3>
            <p className='text-sm w-[87%] my-2 h-10' style={{
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>{news.description}</p>
            <div className='rounded-lg px-4 py-2 w-[90%] my-2 bg-zinc-600 relative'>
                <span className='text-sm text-white'>{news.author || 'Unknown'}</span>
                <br/>
                <span className='text-sm'>{monthWord} {day}, {year}</span>
                <h2 className='text-xs w-full my-2 absolute bottom-1 right-2 text-right'>{news.source.name}</h2>
            </div>
            <button className='text-base  mb-2' onClick={handleModal}>Read more</button>
            {
                isModalOpen &&
                <Modal handleModal={handleModal}>
                    <NewsInfo news={news}/>
                </Modal>
            }
        </div>
    );
};

export default NewsItem;