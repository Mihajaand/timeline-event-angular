import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {EvenementsService} from "./evenements.service";
import {EvenementEntity} from "../entities/Evenements.entity";

@Controller('evenements')
export class EvenementsController {
    constructor(private readonly evenementsService: EvenementsService) {
    }

    // E    ndpoint pour obtenir tous les evenements
    @Get()
    findAll(@Query('debut') debut: string = '', @Query('fin') fin: string = '',): Promise<EvenementEntity[]> {
        let dateDebut = null;
        let dateFin = null;
        if (debut != '') {
            dateDebut = new Date(debut);
        } else {
            dateDebut = new Date();
        }
        dateDebut.setUTCHours(0, 0, 0, 0);
        if (fin != '') {
            dateFin = new Date(fin);
        } else {
            if (debut != '') {
                dateFin = new Date(debut);
            }else {
                dateFin = new Date();
            }
        }
        dateFin.setUTCHours(23, 59, 59, 0);
        return this.evenementsService.findAll(dateDebut, dateFin);
    }

    // Endpoint pour obtenir un evenement par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<EvenementEntity> {
        return this.evenementsService.findOne(+id);
    }

    // Endpoint pour créer un evenement
    @Post()
    create(@Body() table: EvenementEntity): Promise<EvenementEntity> {
        return this.evenementsService.create(table);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() evenement: EvenementEntity): Promise<EvenementEntity> {
        return this.evenementsService.patch(id,evenement);
    }

    // Endpoint pour supprimer un evenement par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.evenementsService.remove(+id);
    }
}
