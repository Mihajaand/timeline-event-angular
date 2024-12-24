import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ClientEntity} from "../entities/Client.entity";
import {FactureEntity} from "../entities/Factures.entity";

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>,
    ) {
    }

    // Obtenir tous les clients
    findAll(): Promise<ClientEntity[]> {
        return this.clientRepository.find({
            relations: ['pays'],
            order:{
                nom:"ASC",
                prenom:"ASC"
            }
        });
    }

    // Obtenir un client par ID
    findOne(id: number): Promise<ClientEntity> {
        return this.clientRepository.findOne({
                where: {id},
                relations: ['pays']
            }
        );
    }

    // Créer un nouvel client
    async create(table: Partial<ClientEntity>): Promise<ClientEntity> {
        table.ref = 'FC_';
        const client = await this.clientRepository.save(table);
        client.ref = 'FC_'+client.id.toString().padStart(6,"0");
        return this.patch(client.id,client);
    }

    // Créer un nouvel client
    async patch(id: number, data: Partial<ClientEntity>): Promise<ClientEntity> {
        await this.clientRepository.update(id, data);
        return this.findOne(id);
    }

    // Supprimer un client
    async remove(id: number): Promise<ClientEntity[]> {
        await this.clientRepository.delete(id);
        return await this.findAll();
    }

}
