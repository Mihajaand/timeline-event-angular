import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { ClientEntity } from "../entities/Client.entity";
import {FactureEntity} from "../entities/Factures.entity";

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // Endpoint pour obtenir tous les utilisateurs
  @Get()
  findAll(): Promise<ClientEntity[]> {
    return this.clientsService.findAll();
  }

  // Endpoint pour obtenir un utilisateur par ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ClientEntity> {
    return this.clientsService.findOne(+id);
  }

  // Endpoint pour créer un utilisateur
  @Post()
  create(@Body() table: ClientEntity): Promise<ClientEntity> {
    //table.ref = 'FC_'+nextId.toString().padStart(2, "0")
    return this.clientsService.create(table);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: ClientEntity): Promise<ClientEntity> {
    return this.clientsService.patch(id, data);
  }

  // Endpoint pour supprimer un utilisateur par ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<ClientEntity[]> {
    return this.clientsService.remove(+id);
  }
}
import { getManager } from 'typeorm';

async function getNextAutoIncrementValue(tableName: string): Promise<number> {
  const entityManager = getManager();

  const result = await entityManager.query(`
    SELECT AUTO_INCREMENT 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${tableName}'
  `);

  return result[0]?.AUTO_INCREMENT || null;
}