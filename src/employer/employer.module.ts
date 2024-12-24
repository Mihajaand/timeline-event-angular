import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmployerEntity} from "../entities/Employer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EmployerEntity])],
  providers: [EmployerService],
  controllers: [EmployerController]
})
export class EmployerModule {}
