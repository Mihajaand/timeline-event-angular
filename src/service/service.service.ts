import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LessThanOrEqual, MoreThanOrEqual, Repository} from "typeorm";
import {ServiceEntity} from "../entities/Services.entity";

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(ServiceEntity)
        private serviceRepository: Repository<ServiceEntity>,
    ) {
    }

    // Obtenir tous les services
    findAll(etat, startOfDay:Date, endOfDay:Date): Promise<ServiceEntity[]> {
        return this.serviceRepository.find({
            where:{
                etat,
                debut: MoreThanOrEqual(startOfDay),
                fin: LessThanOrEqual(endOfDay),
            }
        });
    }

    // Obtenir un type de service par ID
    findOne(id: number): Promise<ServiceEntity> {
        return this.serviceRepository.findOne({
            where: {id},
        });
    }

    // Créer un nouvel type de service
    async create(data: ServiceEntity): Promise<ServiceEntity> {
        const typeFacture = await this.serviceRepository.save(data);
        return this.findOne(typeFacture.id);
    }

    async update(id: number, updateDto: Partial<ServiceEntity>): Promise<ServiceEntity> {
        await this.serviceRepository.update(id, updateDto);
        return this.findOne(id);
    }

    // Créer un nouvel type de service
    async patch(id: number, data: Partial<ServiceEntity>): Promise<ServiceEntity> {
        await this.serviceRepository.update(id, data);
        return this.findOne(id);
    }

    // Supprimer un type de service
    async remove(id: number): Promise<void> {
        await this.serviceRepository.delete(id);
    }
}
