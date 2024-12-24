import { Module } from '@nestjs/common';
import { TypeFactureService } from './type_facture.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeFactureEntity} from "../entities/TypesFactures.entity";
import {TypeFactureController} from "./type_facture.controller";

@Module({
  imports: [TypeOrmModule.forFeature([TypeFactureEntity])],
  providers: [TypeFactureService],
  controllers:[TypeFactureController]
})
export class TypeFactureModule {}
