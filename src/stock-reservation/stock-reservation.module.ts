import { Module } from '@nestjs/common';
import { StockReservationService } from './stock-reservation.service';
import { StockReservationController } from './stock-reservation.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {StockReservationEntity} from "../entities/StocksReservations.entity";

@Module({
  imports: [TypeOrmModule.forFeature([StockReservationEntity])],
  providers: [StockReservationService],
  controllers: [StockReservationController]
})
export class StockReservationModule {}
