import { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../components/responsive";
import { useDispatch, useSelector } from "react-redux";
import carsService from "../../services/carsService";
import { Dispatch } from "redux";
import { setTopCars } from "./slice";
import { GetCars_cars } from "../../services/carsService/__generated__/GetCars";
import { createSelector } from "@reduxjs/toolkit";
import { makeSelectTopCars } from "./selector";
import Car from "../../components/Car";
import MoonLoader from "react-spinners/MoonLoader";

const TopCarsContainer = styled.div`
  ${tw`
    max-w-screen-lg
    w-full
    flex
    flex-col
    items-center
    justify-center
    pr-4
    pl-4
    md:pl-0
    md:pr-0
    mb-10
  `};
`;

const Title = styled.h2`
  ${tw`
    text-3xl
    lg:text-5xl
    text-black
    font-extrabold
  `};
`;

const CarsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
    justify-center
    mt-7
    md:mt-10
  `};
`;

const EmptyCars = styled.div`
  ${tw`
    w-full
    flex
    justify-center
    items-center
    text-sm
    text-gray-500
  `};
`;

const LoadingContainer = styled.div`
  ${tw`
    w-full
    mt-9
    flex
    justify-center
    items-center
    text-base
    text-black
  `};
`;

// const testCar: ICar = {
//     name: "Audi S3 Car",
//     mileage: "10k",
//     thumbnailSrc:
//         "https://cdn.jdpower.com/Models/640x480/2017-Audi-S3-PremiumPlus.jpg",
//     dailyPrice: 70,
//     monthlyPrice: 1600,
//     gearType: "Auto",
//     gas: "Petrol",
// };

// const testCar2: ICar = {
//     name: "HONDA cITY 5 Seater Car",
//     mileage: "20k",
//     thumbnailSrc:
//         "https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg",
//     dailyPrice: 50,
//     monthlyPrice: 1500,
//     gearType: "Auto",
//     gas: "Petrol",
// };
// const cars = [
//     <Car {...testCar} />,
//     <Car {...testCar2} />,
//     <Car {...testCar} />,
//     <Car {...testCar2} />,
//     <Car {...testCar} />,
//     <Car {...testCar2} />,
// ];



const actionDispatch = (dispatch: Dispatch) => ({
    setTopCars: (cars: GetCars_cars[]) => dispatch(setTopCars(cars)),
});

const stateSelector = createSelector(makeSelectTopCars, (topCars) => ({
    topCars,
}));

const wait = (timeout: number) => new Promise((rs) => setTimeout(rs, timeout));
const TopCars = () => {
    const [current, setCurrent] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

    const { topCars } = useSelector(stateSelector);
    const { setTopCars } = actionDispatch(useDispatch());


    const isEmptyTopCars = !topCars || topCars.length === 0;

    const cars =
        (!isEmptyTopCars &&
            topCars.map((car) => <Car {...car} thumbnailSrc={car.thumbnailUrl} />)) || [];

    // const numberOfDots = isMobile ? cars.length : Math.ceil(cars.length / 3);
    const numberOfDots = isMobile ? cars.length : Math.ceil(cars.length / 3);

    useEffect(() => {
        fetchTopCars();
    }, []);

    const fetchTopCars = async () => {
        setLoading(true);
        const cars = await carsService.getCars().catch((err) => {
            console.log("Error:", err);
        });

        // await wait(3000); //test Loading

        console.log("Cars: ", cars);
        if (cars) setTopCars(cars);
        setLoading(false);
    };

    return (
        <TopCarsContainer>
            <Title>Explore Our Top Deals</Title>
            {isLoading && (
                <LoadingContainer>
                    <MoonLoader loading size={20} />
                </LoadingContainer>
            )}
            {isEmptyTopCars && !isLoading && <EmptyCars>No Cars To Show!</EmptyCars>}
            {!isEmptyTopCars && !isLoading && (
                <CarsContainer>
                    <Carousel
                        value={current}
                        onChange={setCurrent}
                        slides={cars}
                        plugins={[
                            "clickToChange",
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides: 3,
                                },
                            },
                        ]}
                        breakpoints={{
                            640: {
                                plugins: [
                                    {
                                        resolve: slidesToShowPlugin,
                                        options: {
                                            numberOfSlides: 1,
                                        },
                                    },
                                ],
                            },
                            900: {
                                plugins: [
                                    {
                                        resolve: slidesToShowPlugin,
                                        options: {
                                            numberOfSlides: 2,
                                        },
                                    },
                                ],
                            },
                        }}
                    />
                    <Dots value={current} onChange={setCurrent} number={numberOfDots} />
                </CarsContainer>
            )}
        </TopCarsContainer>
    );
};

export default TopCars;
// function makeSelectTopCars(makeSelectTopCars: any, arg1: (topCars: unknown) => { topCars: unknown; }) {
//     throw new Error("Function not implemented.");
// }

