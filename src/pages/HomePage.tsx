import React from 'react';
import Header from '../components/home/Header/Header';
import ServiceProviders from '../components/home/ServiceProviders/ServiceProviders';
import Benefits from '../components/home/Benifits/Benifits';
import './style/HomePage.css'

import gearImageLeft from "../assets/left-machine.png"
import UserHeader from '../components/layout/header/user-header/UserHeader';
import Footer from '../components/layout/footer/Footer';

const HomePage: React.FC = () => {
    return (
        <>
            <UserHeader/>
            <Header />
            <div className="home-page-container">
                <ServiceProviders />
                <Benefits />
            </div>
            <Footer/>
        </>
    );
};

export default HomePage;