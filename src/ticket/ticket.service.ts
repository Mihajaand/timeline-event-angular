import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TicketEntity} from "../entities/Tickets.entity";

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TicketEntity)
        private ticketRepository: Repository<TicketEntity>,
    ) {
    }

    // Obtenir tous les tickets
    findAll(etat): Promise<TicketEntity[]> {
        return this.ticketRepository.find({
            where: {etat},
            relations:['statut','reservation','facture']
        });
    }

    // Obtenir un ticket par ID
    findOne(id: number): Promise<TicketEntity> {
        return this.ticketRepository.findOne({
            where: {id},
            relations:['statut','reservation','facture']
        });
    }

    // Créer un nouvel ticket
    async create(data: TicketEntity): Promise<TicketEntity> {
        const ticket = await this.ticketRepository.save(data);
        return this.findOne(ticket.id);
    }

    async update(id: number, updateDto: Partial<TicketEntity>): Promise<TicketEntity> {
        await this.ticketRepository.update(id, updateDto);
        return this.findOne(id);
    }

    // Créer un nouvel ticket
    async patch(id: number, data: Partial<TicketEntity>): Promise<TicketEntity> {
        await this.ticketRepository.update(id, data);
        return this.findOne(id);
    }

    // Supprimer un ticket
    async remove(id: number): Promise<void> {
        await this.ticketRepository.delete(id);
    }
}
