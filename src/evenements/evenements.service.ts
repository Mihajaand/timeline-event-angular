import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {EvenementEntity} from "../entities/Evenements.entity";
import {DataSource, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository} from "typeorm";

@Injectable()
export class EvenementsService {
    constructor(
        @InjectRepository(EvenementEntity)
        private evenementRepository: Repository<EvenementEntity>,
        private dataSource: DataSource
    ) {}

    // Obtenir tous les evenements
    findAll(debut, fin): Promise<EvenementEntity[]> {
        //this.dataSource.setOptions({logging: true});
        //console.log({debut,fin})
        return this.evenementRepository.find({
            where:{
                debut: MoreThanOrEqual(debut),
                fin: LessThan(fin),
            }
        });
    }

    // Obtenir un evenement par ID
    findOne(id: number): Promise<EvenementEntity> {
        return this.evenementRepository.findOneBy({ id });
    }

    // Créer un nouvel evenement
    create(data: EvenementEntity): Promise<EvenementEntity> {
        return this.evenementRepository.save(data);
    }

    async patch(id,data: EvenementEntity): Promise<EvenementEntity> {
        await this.evenementRepository.update(id, data);
        return this.findOne(id);
    }

    // Supprimer un evenement
    async remove(id: number): Promise<void> {
        await this.evenementRepository.delete(id);
    }
}
