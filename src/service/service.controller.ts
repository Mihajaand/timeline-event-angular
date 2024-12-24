import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ServiceService} from "./service.service";
import {ServiceEntity} from "../entities/Services.entity";

@Controller('services')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) {
    }

    // Endpoint pour obtenir touts les services
    @Get()
    findAll(@Query('etat') etat: boolean = true, @Query('begin') begin: string = '', @Query('end') end: string = ''): Promise<ServiceEntity[]> {
        let beginDate: Date;
        let endDate: Date;
        if (begin == '') {
            beginDate = new Date();
        } else {
            beginDate = new Date(begin);
        }
        if (end == '') {
            endDate = new Date();
        } else {
            endDate = new Date(end);
        }
        beginDate.setUTCHours(0, 0, 0, 0);
        endDate.setUTCHours(23, 59, 59, 999);
        return this.serviceService.findAll(etat, beginDate, endDate);
    }

    // Endpoint pour obtenir un service par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<ServiceEntity> {
        return this.serviceService.findOne(+id);
    }

    // Endpoint pour créer un service
    @Post()
    create(@Body() data: ServiceEntity): Promise<ServiceEntity> {
        return this.serviceService.create(data);
    }

    // Endpoint pour modifie un service
    @Patch(':id')
    update(@Param('id') id: number, @Body() data: ServiceEntity): Promise<ServiceEntity> {
        return this.serviceService.patch(id, data);
    }

    // Endpoint pour supprimer un service par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.serviceService.remove(+id);
    }
}
