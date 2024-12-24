import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TypeFactureEntity} from "../entities/TypesFactures.entity";

@Injectable()
export class TypeFactureService {
    constructor(
        @InjectRepository(TypeFactureEntity)
        private typeFactureRepository: Repository<TypeFactureEntity>,
    ) {
    }

    // Obtenir tous les type de factures
    findAll(statut): Promise<TypeFactureEntity[]> {
        return this.typeFactureRepository.find({
            where:{statut}
        });
    }

    // Obtenir un type de facture par ID
    findOne(id: number): Promise<TypeFactureEntity> {
        return this.typeFactureRepository.findOne({
            where: {id},
        });
    }

    // Créer un nouvel type de facture
    async create(data: TypeFactureEntity): Promise<TypeFactureEntity> {
        const typeFacture = await this.typeFactureRepository.save(data);
        return this.findOne(typeFacture.id);
    }

    async update(id: number, updateDto: Partial<TypeFactureEntity>): Promise<TypeFactureEntity> {
        await this.typeFactureRepository.update(id, updateDto);
        return this.findOne(id);
    }

    // Créer un nouvel type de facture
    async patch(id: number, data: Partial<TypeFactureEntity>): Promise<TypeFactureEntity> {
        await this.typeFactureRepository.update(id, data);
        return this.findOne(id);
    }

    // Supprimer un type de facture
    async remove(id: number): Promise<void> {
        await this.typeFactureRepository.delete(id);
    }
}
