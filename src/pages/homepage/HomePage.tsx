import React from 'react';
import Header from '../../components/home/Header/Header.tsx';
import ServiceProviders from '../../components/home/ServiceProviders/ServiceProviders.tsx';
import Benefits from '../../components/home/Benifits/Benifits.tsx';
import './style/HomePage.css'

import gearImageLeft from "../../assets/left-machine.png"
import UserHeader from '../../components/layout/header/user-header/UserHeader.tsx';
import Footer from '../../components/layout/footer/Footer.tsx';

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