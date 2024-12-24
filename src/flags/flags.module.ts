import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import {FlagsController} from "./flags.controller";
import {FlagEntity} from "../entities/Flags.entity";
import {FlagsService} from "./flags.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [TypeOrmModule.forFeature([FlagEntity]),HttpModule],
  providers: [FlagsService],
  controllers: [FlagsController]
})
export class FlagsModule {}
