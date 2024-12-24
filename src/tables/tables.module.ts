import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TablesEntity } from "../entities/Tables.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TablesEntity])],
  providers: [TablesService],
  controllers: [TablesController]
})
export class TablesModule {}
