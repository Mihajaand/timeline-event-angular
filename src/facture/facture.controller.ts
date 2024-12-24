import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {FactureService} from "./facture.service";
import {FactureEntity} from "../entities/Factures.entity";

@Controller('factures')
export class FactureController {
    constructor(private readonly factureService: FactureService) {
    }

    // Endpoint pour obtenir tous les factures
    @Get()
    findAll(@Query('etat') etat: boolean = true): Promise<FactureEntity[]> {
        return this.factureService.findAll(etat);
    }

    // Endpoint pour obtenir un facture par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<FactureEntity> {
        return this.factureService.findOne(+id);
    }

    // Endpoint pour créer un facture
    @Post()
    create(@Body() data: FactureEntity): Promise<FactureEntity> {
        return this.factureService.create(data);
    }

    // Endpoint pour modifie un facture
    @Patch(':id')
    update(@Param('id') id: number, @Body() data: FactureEntity): Promise<FactureEntity> {
        return this.factureService.patch(id, data);
    }

    // Endpoint pour supprimer un facture par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.factureService.remove(+id);
    }
}
