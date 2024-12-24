import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {StockService} from "./stock.service";
import {StockEntity} from "../entities/Stocks.entity";

@Controller('stocks')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    // Endpoint pour obtenir tous les stocks
    @Get()
    findAll(@Query('debut') debut: string = '', @Query('fin') fin: string = '',): Promise<StockEntity[]> {
        let dateDebut:Date = null;
        let dateFin:Date = null;
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
        return this.stockService.findAll(dateDebut,dateFin);
    }

    // Endpoint pour obtenir un stock par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<StockEntity> {
        return this.stockService.findOne(+id);
    }

    // Endpoint pour créer un stock
    @Post()
    create(@Body() table: StockEntity): Promise<StockEntity> {
        return this.stockService.create(table);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() data: StockEntity): Promise<StockEntity> {
        return this.stockService.update(id, data);
    }

    // Endpoint pour supprimer un stock par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.stockService.remove(+id);
    }
}
