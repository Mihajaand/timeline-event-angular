import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {EmployerService} from "./employer.service";
import {EmployerEntity} from "../entities/Employer.entity";
import {ApiQuery} from "@nestjs/swagger";
import {ConteneurType} from "../entities/Conteneur.type";

@Controller('employers')
export class EmployerController {
    constructor(private readonly employerService: EmployerService) {
    }

    // Endpoint pour obtenir tous les employers
    @Get()
    @ApiQuery({
        name: "actif",
        description: "Statut de l'employer à prendre",
        type: Number,
        default: 1,
        required: false,
        // This value is optional
    })
    findAll(
        @Query('conteneur') conteneur: ConteneurType = 'Restaurant'
    ): Promise<EmployerEntity[]> {
        return this.employerService.findAll(conteneur);
    }

    // Endpoint pour obtenir un employer par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<EmployerEntity> {
        return this.employerService.findOne(+id);
    }

    // Endpoint pour créer un employer
    @Post()
    create(@Body() table: EmployerEntity): Promise<EmployerEntity> {
        return this.employerService.create(table);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() evenement: EmployerEntity): Promise<EmployerEntity> {
        return this.employerService.patch(id,evenement);
    }

    // Endpoint pour supprimer un employer par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.employerService.remove(+id);
    }
}
