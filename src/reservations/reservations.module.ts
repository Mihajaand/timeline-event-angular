import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReservationEntity } from "../entities/Reservation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
  providers: [ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
