import { NewCarInput } from './dto/new-car.input';
import { Car } from './entities/car';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CarsService } from "./cars.service";

@Resolver()
export class CarsReslover {
    constructor(private carsService: CarsService) {

    }
    @Query(returns => [Car])
    public async cars(): Promise<Car[]> {
        return await this.carsService.getAllCars()
            .catch((error) => {
                throw error;
            })
    }

    @Mutation(returns => Car)
    public async addNewCar(@Args("newCarData") newCarData: NewCarInput): Promise<Car> {
        return await this.carsService.addCar(newCarData)
            .catch((error) => {
                throw error;
            })
    }
}