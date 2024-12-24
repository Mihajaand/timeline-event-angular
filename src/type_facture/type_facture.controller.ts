import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TypeFactureService} from "./type_facture.service";
import {TypeFactureEntity} from "../entities/TypesFactures.entity";

@Controller('types-factures')
export class TypeFactureController {
    constructor(private readonly typeFactureService: TypeFactureService) {
    }

    // Endpoint pour obtenir touts les types de factures
    @Get()
    findAll(@Query('statut') statut: string = 'en cours'): Promise<TypeFactureEntity[]> {
        return this.typeFactureService.findAll(statut);
    }

    // Endpoint pour obtenir un type de facture par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<TypeFactureEntity> {
        return this.typeFactureService.findOne(+id);
    }

    // Endpoint pour créer un type de facture
    @Post()
    create(@Body() data: TypeFactureEntity): Promise<TypeFactureEntity> {
        return this.typeFactureService.create(data);
    }

    // Endpoint pour modifie un type de facture
    @Patch(':id')
    update(@Param('id') id: number, @Body() data: TypeFactureEntity): Promise<TypeFactureEntity> {
        return this.typeFactureService.patch(id, data);
    }

    // Endpoint pour supprimer un type de facture par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.typeFactureService.remove(+id);
    }
}
