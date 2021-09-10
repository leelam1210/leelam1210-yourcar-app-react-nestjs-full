import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarsReslover } from "./cars.resolver";
import { CarsService } from "./cars.service";
import { Car } from "./entities/car";

@Module({
    imports: [TypeOrmModule.forFeature([
        Car,
    ])],
    providers: [CarsService, CarsReslover],
    exports: [CarsService],
})

export class CarsModule { }