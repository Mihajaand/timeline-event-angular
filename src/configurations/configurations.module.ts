import { Module } from '@nestjs/common';
import { ConfigurationsController } from './configurations.controller';
import { ConfigurationService } from './configurations.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigurationEntity} from "../entities/Configurations.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ConfigurationEntity])],
  controllers: [ConfigurationsController],
  providers: [ConfigurationService]
})
export class ConfigurationsModule {}
