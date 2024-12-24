import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ConfigurationService} from "./configurations.service";
import {ConfigurationEntity} from "../entities/Configurations.entity";

@Controller('configurations')
export class ConfigurationsController {
    constructor(private readonly configurationService: ConfigurationService) {}

    // Endpoint pour obtenir tous les configurations
    @Get()
    findAll(): Promise<ConfigurationEntity[]> {
        return this.configurationService.findAll();
    }

    // Endpoint pour obtenir une configuration par ID
    @Get(':id')
    findOne(@Param('id') id: string): Promise<ConfigurationEntity> {
        return this.configurationService.findOne(+id);
    }

    // Endpoint pour créer une configuration
    @Get(':col')
    findOneByName(@Param('col') col: string): Promise<ConfigurationEntity> {
        return this.configurationService.findOneByName(col);
    }
    // Endpoint pour créer une configuration
    @Post()
    create(@Body() data: ConfigurationEntity): Promise<ConfigurationEntity> {
        return this.configurationService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() data: ConfigurationEntity): Promise<ConfigurationEntity> {
        return this.configurationService.patch(id, data);
    }

    // Endpoint pour supprimer une configuration par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<ConfigurationEntity[]> {
        return this.configurationService.remove(+id);
    }
}
