import React, {useState} from 'react';
import { ReactComponent as Logo } from '../../../assets/icons/earth-europe.svg';
import { ReactComponent as Home } from '../../../assets/icons/house.svg';
import { ReactComponent as Map } from '../../../assets/icons/map.svg';
import { ReactComponent as NewsItem } from '../../../assets/icons/newspaper.svg';
import { ReactComponent as Info } from '../../../assets/icons/circle-info.svg';
import { ReactComponent as SearchIcon } from "../../../assets/icons/magnifying-glass.svg"
import {Link} from "react-router-dom";
import NavItem from "./NavItem";
import SearchContainer from "../../modal/content/SearchContainer";
import Modal from "../../modal/Modal";



const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isHovering, setIsHovering] = useState(false);
    
    const handleModal = () => {
      setIsModalOpen(!isModalOpen)
    }
    
    return (
        <header className='w-full h-14 px-48'>
            <div className='flex justify-between items-center h-full'>
                <div className=''>
                    <Link to='/'>
                        <Logo  className='w-10 fill-gray-500'/>
                    </Link>
                </div>
                <nav className='flex gap-8 '>
                    <NavItem className='hover:text-pink-300 transition ease-in-out duration-300' text='Home' link='/'>
                        {/*<Home className={`w-6 fill-gray-300 ${isHovering && 'fill-pink-300'} transition ease-in-out duration-300`}/>*/}
                    </NavItem>
                    <NavItem className='hover:text-pink-300 transition ease-in-out duration-300' text='Map' link='/map'>
                        {/*<Map className={`w-6 fill-gray-300 ${isHovering && 'fill-pink-300'} transition ease-in-out duration-300`}/>*/}
                    </NavItem>
                    <NavItem className='hover:text-pink-300 transition ease-in-out duration-300' text='News' link='/news'>
                        {/*<NewsItem className={`w-6 fill-gray-300 ${isHovering && 'fill-pink-300'} transition ease-in-out duration-300`}/>*/}
                    </NavItem>
                    <NavItem className='hover:text-pink-300 transition ease-in-out duration-300' text='About' link='/about'>
                        {/*<Info className={`w-6 fill-gray-300 ${isHovering && 'fill-pink-300'} transition ease-in-out duration-300`}/>*/}
                    </NavItem>
                </nav>
                
                <button className='flex items-center justify-center gap-2 fill-gray-300 hover:fill-pink-300 hover:text-pink-300 ease-in-out transition-colors duration-300' onClick={handleModal}>
                    <SearchIcon width={18}/>
                    Search
                </button>
                {
                    isModalOpen &&
                    <Modal handleModal={handleModal}>
                        <SearchContainer toggleModal={handleModal}/>
                    </Modal>
                }
            </div>
        </header>
    );
};

export default Header;