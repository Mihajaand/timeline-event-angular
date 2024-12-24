import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TicketEntity} from "../entities/Tickets.entity";
import {TicketService} from "./ticket.service";

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {
    }

    // Endpoint pour obtenir tous les tickets
    @Get()
    findAll(@Query('etat') etat: number = 1): Promise<TicketEntity[]> {
        return this.ticketService.findAll( etat);
    }

    // Endpoint pour obtenir un ticket par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<TicketEntity> {
        return this.ticketService.findOne(+id);
    }

    // Endpoint pour créer un ticket
    @Post()
    create(@Body() data: TicketEntity): Promise<TicketEntity> {
        return this.ticketService.create(data);
    }

    // Endpoint pour modifie un ticket
    @Patch(':id')
    update(@Param('id') id: number, @Body() data: TicketEntity): Promise<TicketEntity> {
        return this.ticketService.patch(id, data);
    }

    // Endpoint pour supprimer un ticket par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.ticketService.remove(+id);
    }
}
