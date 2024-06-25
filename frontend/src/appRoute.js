import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import Home from "./pages/home/Home";
import Map from "./pages/map/Map";
import Country from "./pages/country/Country";
import News from "./pages/news/News";
import About from "./pages/about/About";
import NotFound from "./pages/404/NotFound";

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/map" element={<Map/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/country/:id" element={<Country/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            {/*<Footer/>*/}
        </BrowserRouter>
    );
};

export default AppRoute;