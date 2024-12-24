import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServiceEntity} from "../entities/Services.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [ServiceService],
  controllers: [ServiceController]
})
export class ServiceModule {}
