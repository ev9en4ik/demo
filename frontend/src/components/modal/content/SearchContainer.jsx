import React, {useState} from 'react';
import { ReactComponent as SearchIcon } from "../../../assets/icons/magnifying-glass.svg"
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import Modal from "../Modal";
import NewsInfo from "./NewsInfo";

const SearchContainer = ({toggleModal}) => {
    const [searchedCountries, setSearchedCountries] = useState([])
    const [searchedNews, setSearchedNews] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [chosenNews, setChosenNews] = useState({})
    const countries = useSelector(state => state.country.countries)
    const news = useSelector(state => state.news.news)
    const navigate = useNavigate()
    const handleModalOpen = (data) => {
        setChosenNews(data)
        setIsModalOpen(true)
    }
    
    const goToCountry = (id) => {
        toggleModal()
        navigate('/country/' + id)
    }
    
    const handleModalClose = () => {
        setIsModalOpen(false)
    }
    
    const findData = (value) => {
        setSearchedCountries(countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase())))
        setSearchedNews(news.filter(news => news.title.toLowerCase().includes(value.toLowerCase())))
    }
    return (
        <div className='w-500 min-h-500'>
            <div className='flex justify-center gap-4 fill-gray-300 mb-4'>
                <SearchIcon width={18} />
                <input onChange={e => findData(e.target.value)} type="text" placeholder='Type to search' className='p-1 px-2 rounded-lg border-none bg-slate-700 text-gray-300 w-[70%]'/>
            </div>
            <div>
                { searchedCountries.length === 0 ?
                    <div className='h-[200px] w-[400px]'></div>
                    :
                    <div className='h-[200px] w-[400px] overflow-y-scroll '>
                        {
                            searchedCountries.length === 1 &&
                                <h1>Country</h1>
                            
                        }
                        {
                            searchedCountries.length >= 2 &&
                                <h1>Countries</h1>
                            
                        }
                        {
                            searchedCountries.map(country => (
                                <div key={country.id} className='px-4 py-2'>
                                    <button
                                        className='text-base text-yellow-200'
                                        onClick={() => goToCountry(country.id)}>
                                        {country.name}
                                    </button>
                                    {/*<Link className='text-base text-yellow-200' to={'country/' + country.id}>*/}
                                    {/*    {country.name}*/}
                                    {/*</Link>*/}
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    searchedNews.length >= 1 &&
                    <h1>News</h1>
                    
                }
                { searchedNews.length === 0 ?
                    <div className='h-[200px]  w-[400px]'></div>
                    :
                    <div className='h-[200px] w-[400px] overflow-y-scroll '>
                        {
                            searchedNews.map(news => (
                                <div key={news.id} className='px-4 py-2'>
                                    <button onClick={() => handleModalOpen(news)} className='text-base text-yellow-200'>{news.title}</button>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            {
                isModalOpen &&
                <Modal handleModal={handleModalClose}>
                    <NewsInfo news={chosenNews}/>
                </Modal>
            }
        </div>
    );
};

export default SearchContainer;