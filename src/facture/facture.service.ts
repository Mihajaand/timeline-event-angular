import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FactureEntity} from "../entities/Factures.entity";

@Injectable()
export class FactureService {
    constructor(
        @InjectRepository(FactureEntity)
        private factureRepository: Repository<FactureEntity>,
    ) {
    }

    // Obtenir tous les factures
    findAll(etat): Promise<FactureEntity[]> {
        return this.factureRepository.find({
            where:{etat},
            relations:['type','reservation','ticket'],
            order:{
                code:'ASC'
            }
        });
    }

    // Obtenir un facture par ID
    findOne(id: number): Promise<FactureEntity> {
        return this.factureRepository.findOne({
            where: {id},
            relations:['type','reservation','ticket']
        });
    }

    // Créer un nouvel facture
    async create(data: FactureEntity): Promise<FactureEntity> {
        const statutTicket = await this.factureRepository.save(data);
        return this.findOne(statutTicket.id);
    }

    async update(id: number, updateDto: Partial<FactureEntity>): Promise<FactureEntity> {
        await this.factureRepository.update(id, updateDto);
        return this.findOne(id);
    }

    // Créer un nouvel facture
    async patch(id: number, data: Partial<FactureEntity>): Promise<FactureEntity> {
        await this.factureRepository.update(id, data);
        return this.findOne(id);
    }

    // Supprimer un facture
    async remove(id: number): Promise<void> {
        await this.factureRepository.delete(id);
    }
}
