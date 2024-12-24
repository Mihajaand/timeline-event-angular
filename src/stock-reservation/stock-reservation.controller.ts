import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {StockReservationService} from "./stock-reservation.service";
import {StockReservationEntity} from "../entities/StocksReservations.entity";

@Controller('stock-reservations')
export class StockReservationController {
    constructor(private readonly stockReservationService: StockReservationService) {}

    // Endpoint pour obtenir tous les stok reservations
    @Get()
    findAll(): Promise<StockReservationEntity[]> {
        return this.stockReservationService.findAll();
    }

    // Endpoint pour obtenir un stok reservation par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<StockReservationEntity> {
        return this.stockReservationService.findOne(+id);
    }

    // Endpoint pour créer un stok reservation
    @Post()
    create(@Body() stokReservation: StockReservationEntity): Promise<StockReservationEntity> {
        return this.stockReservationService.create(stokReservation);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() data: StockReservationEntity): Promise<StockReservationEntity> {
        return this.stockReservationService.update(id, data);
    }

    // Endpoint pour supprimer un stok reservation par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.stockReservationService.remove(+id);
    }
}
