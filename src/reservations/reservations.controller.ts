import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from "@nestjs/common";
import {ReservationsService} from "../reservations/reservations.service";
import {ReservationEntity} from "../entities/Reservation.entity";

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {
    }

    // Endpoint pour obtenir toutes les réservations
    @Get()
    findAll(@Query('begin') begin: string, @Query('end') end: string, @Query('conteneur') conteneur: string = 'Restaurant', @Query('actif') actif: number = 1): Promise<ReservationEntity[]> {
        if(end == null || end  == ''){
            end = begin;
        }
        return this.reservationsService.findAll(begin, end, conteneur, actif);
    }

    // Endpoint pour obtenir une réservation par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<ReservationEntity> {
        return this.reservationsService.findOne(+id);
    }


    // Endpoint pour créer une réservation
    @Post()
    create(@Body() reservation: ReservationEntity): Promise<ReservationEntity> {
        return this.reservationsService.create(reservation);
    }

    // Endpoint pour modifie une réservation
    @Patch(':id')
    update(@Param('id') id: number, @Body() reservation: ReservationEntity): Promise<ReservationEntity> {
        if (reservation.client) {
            reservation.clientId = Number(reservation.client.toString().replace('/clients/', ''));
            delete reservation.client;
        }
        if (reservation.table) {
            reservation.tableId = Number(reservation.table.toString().replace('/tables/', ''));
            delete reservation.table;
        }
        return this.reservationsService.patch(id, reservation);
    }

    // Endpoint pour supprimer une réservation par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.reservationsService.remove(+id);
    }
}
