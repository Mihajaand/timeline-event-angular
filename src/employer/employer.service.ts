import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {EmployerEntity} from "../entities/Employer.entity";
import {Repository} from "typeorm";
import {ConteneurType} from "../entities/Conteneur.type";

@Injectable()
export class EmployerService {
    constructor(
        @InjectRepository(EmployerEntity)
        private employerRepository: Repository<EmployerEntity>,
    ) {
    }

    // Obtenir tous les employers
    findAll(conteneur: ConteneurType = 'Restaurant'): Promise<any[]> {
        if (conteneur != 'Restaurant' && conteneur != 'Hotel')
            return this.employerRepository.find();
        else
            return Promise.resolve([]);
    }

    // Obtenir un employer par ID
    findOne(id: number): Promise<EmployerEntity> {
        return this.employerRepository.findOneBy({id});
    }

    // Créer un nouvel employer
    create(data: EmployerEntity): Promise<EmployerEntity> {
        return this.employerRepository.save(data);
    }

    async patch(id, data: EmployerEntity): Promise<EmployerEntity> {
        await this.employerRepository.update(id, data);
        return this.findOne(id);
    }

    // Supprimer un employer
    async remove(id: number): Promise<void> {
        await this.employerRepository.delete(id);
    }
}
