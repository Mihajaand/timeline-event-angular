import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {StatutTicketEntity} from "../entities/StatutsTickets.entity";

@Injectable()
export class StatutTicketService {
    constructor(
        @InjectRepository(StatutTicketEntity)
        private statutTicketRepository: Repository<StatutTicketEntity>,
    ) {
    }

    // Obtenir tous les statut tickets
    findAll(statut): Promise<StatutTicketEntity[]> {
        return this.statutTicketRepository.find({
            where:{statut}
        });
    }

    // Obtenir un statut ticket par ID
    findOne(id: number): Promise<StatutTicketEntity> {
        return this.statutTicketRepository.findOne({
            where: {id},
            //relations: ['table', 'client']
        });
    }

    // Créer un nouvel statut ticket
    async create(data: StatutTicketEntity): Promise<StatutTicketEntity> {
        const statutTicket = await this.statutTicketRepository.save(data);
        return this.findOne(statutTicket.id);
    }

    async update(id: number, updateDto: Partial<StatutTicketEntity>): Promise<StatutTicketEntity> {
        await this.statutTicketRepository.update(id, updateDto);
        return this.findOne(id);
    }

    // Créer un nouvel statut ticket
    async patch(id: number, data: Partial<StatutTicketEntity>): Promise<StatutTicketEntity> {
        await this.statutTicketRepository.update(id, data);
        return this.findOne(id);
    }

    // Supprimer un statut ticket
    async remove(id: number): Promise<void> {
        await this.statutTicketRepository.delete(id);
    }
}
