import React from 'react';
import styled from 'styled-components';
import tw from "twin.macro";
import BookCar from '../../components/BookCar';
import { Marginer } from '../../components/Marginer';
import Navbar from '../../components/Navbar';
import TopSection from './topSection';
import BookingSteps from './bookingSteps';
import { AboutUs } from './aboutUs';
import TopCars from './topCars';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;

const HomePage = () => {
    return (
        <PageContainer>
            <Navbar />
            <TopSection />
            <Marginer direction="vertical" margin="4em" />
            <BookCar />
            <Marginer direction="vertical" margin="10em" />
            <BookingSteps />
            <Marginer direction="vertical" margin="8em" />
            <AboutUs />
            <Marginer direction="vertical" margin="8em" />
            <TopCars />
            <Footer />
        </PageContainer>
    )
}

export default HomePage
