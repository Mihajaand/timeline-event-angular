import { Module } from '@nestjs/common';
import { StatutTicketController } from './statut_ticket.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {StatutTicketEntity} from "../entities/StatutsTickets.entity";
import {StatutTicketService} from "./statut_ticket.service";

@Module({
  imports: [TypeOrmModule.forFeature([StatutTicketEntity])],
  providers:[StatutTicketService],
  controllers: [StatutTicketController]
})
export class StatutTicketModule {}
