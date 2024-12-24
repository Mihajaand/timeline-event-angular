import { Module } from '@nestjs/common';
import { EvenementsService } from './evenements.service';
import { EvenementsController } from './evenements.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EvenementEntity} from "../entities/Evenements.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EvenementEntity])],
  providers: [EvenementsService],
  controllers: [EvenementsController]
})
export class EvenementsModule {}
