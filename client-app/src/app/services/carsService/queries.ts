import gql from "graphql-tag";


export const GER_ALL_CARS = gql`
    query GetCars{
        cars{
            id
            name
            mileage
            thumbnailUrl
            monthlyPrice
            dailyPrice
            gas
            gearType
        }
    }
`;