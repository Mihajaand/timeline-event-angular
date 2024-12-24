import {BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {TablesService} from "./tables.service";
import {TablesEntity} from "../entities/Tables.entity";
import {ClientEntity} from "../entities/Client.entity";
import {ApiBody, ApiOperation, ApiProperty, ApiQuery, ApiTags, PartialType} from "@nestjs/swagger";
import {Transform} from "stream";
import {ConteneurType} from "../entities/Conteneur.type";

@Controller('tables')
@ApiTags("Conteneurs")
export class TablesController {
    constructor(private readonly tablesService: TablesService) {
    }

    // Endpoint pour obtenir tous les utilisateurs
    @Get()
    @ApiOperation({summary: 'Prends la liste des conteneurs (tables, chambres, box, ...)'})
    @ApiQuery({
        name: "begin",
        description: "Date de début à utiliser dans les filtres",
        type: String,
        required: true // This value is optional
    })
    @ApiQuery({
        name: "end",
        description: "Date de fin à utiliser dans les filtres",
        type: String,
        required: true // This value is optional
    })
    @ApiQuery({
        name: "actif",
        description: "Statut du conteneur à prendre",
        type: Number,
        default: 1,
        required: false,
        // This value is optional
    })
    async findAll(
        @Query('begin') begin: string,
        @Query('end') end: string,
        @Query('conteneur') conteneur: ConteneurType = 'Restaurant',
        @Query('actif') actif: number = 1
    ): Promise<any> {

        if (end == '' || end == null) {
            end = begin;
        }
        return {
            report: await this.tablesService.getTablesReport(begin, end, conteneur, actif),
            tables: await this.tablesService.findAll(conteneur, actif)
        };
    }

    // Endpoint pour obtenir un utilisateur par ID
    @Get(':id')
    @ApiOperation({summary: 'Prends un conteneur (tables, chambres, box, ...) par son ID'})
    findOne(@Param('id') id: string): Promise<TablesEntity> {
        return this.tablesService.findOne(+id);
    }

    // Endpoint pour créer un utilisateur
    @Post()
    create(@Body() table: TablesEntity): Promise<TablesEntity> {
        return this.tablesService.create(table);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() data: TablesEntity): Promise<TablesEntity> {
        return this.tablesService.patch(id, data);
    }

    // Endpoint pour supprimer un utilisateur par ID
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.tablesService.remove(+id);
    }


}
