import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {StatutTicketService} from "./statut_ticket.service";
import {StatutTicketEntity} from "../entities/StatutsTickets.entity";

@Controller('statuts-tickets')
export class StatutTicketController {
    constructor(private readonly statutTicketService: StatutTicketService) {
    }

    // Endpoint pour obtenir tous les statuts de tickets
    @Get()
    findAll(@Query('statut') statut: string = 'en cours'): Promise<StatutTicketEntity[]> {
        return this.statutTicketService.findAll( statut);
    }

    // Endpoint pour obtenir un statut de ticket par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<StatutTicketEntity> {
        return this.statutTicketService.findOne(+id);
    }

    // Endpoint pour créer un statut de ticket
    @Post()
    create(@Body() data: StatutTicketEntity): Promise<StatutTicketEntity> {
        return this.statutTicketService.create(data);
    }

    // Endpoint pour modifie un statut de ticket
    @Patch(':id')
    update(@Param('id') id: number, @Body() data: StatutTicketEntity): Promise<StatutTicketEntity> {
        return this.statutTicketService.patch(id, data);
    }

    // Endpoint pour supprimer un statut de ticket par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.statutTicketService.remove(+id);
    }
}
