import { Module } from '@nestjs/common';
import { FactureService } from './facture.service';
import { FactureController } from './facture.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FactureEntity} from "../entities/Factures.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FactureEntity])],
  providers: [FactureService],
  controllers: [FactureController]
})
export class FactureModule {}
