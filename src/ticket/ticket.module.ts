import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TicketEntity} from "../entities/Tickets.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  providers: [TicketService],
  controllers: [TicketController]
})
export class TicketModule {}
