import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ServiceService} from "../service/service.service";
import {CurencyRateEntity} from "../entities/CurencyRates.entity";
import {CurencyRateService} from "./curency-rate.service";
import {ConfigurationService} from "../configurations/configurations.service";

@Controller('curency-rate')
export class CurencyRateController {
    constructor(private readonly curencyRateService: CurencyRateService) {

    }

    // Endpoint pour obtenir touts les services
    @Get()
    async findAll(@Query('date') date: string = '',@Query('filter') filter: string = ''): Promise<any[]> {
        let beginDate: Date;
        if (date == '') {
            beginDate = new Date();
        } else {
            beginDate = new Date(date);
        }
        beginDate.setUTCHours(0, 0, 0, 0);
        const list = await this.curencyRateService.findAll(beginDate);
        if (list.length == 0) {
            return await this.curencyRateService.getExchangeRate(beginDate);
        }
        return list;
    }


    // Endpoint pour obtenir un service par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<CurencyRateEntity> {
        return this.curencyRateService.findOne(+id);
    }
    // Endpoint pour obtenir un service par ID
    @Get(':col/:value')
    async findOneBy(@Param('col') col: string,@Param('value') value: string,@Query('date') date: string = ''): Promise<CurencyRateEntity> {
        return this.curencyRateService.findOneBy(col,value,date);
    }

}
