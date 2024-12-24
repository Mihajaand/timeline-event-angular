import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {FlagEntity} from "../entities/Flags.entity";
import {ReservationEntity} from "../entities/Reservation.entity";

@Injectable()
export class FlagsService {
    constructor(
        @InjectRepository(FlagEntity)
        private flagRepository: Repository<FlagEntity>,
    ) {
    }

    // Obtenir tous les pays
    findAll(): Promise<FlagEntity[]> {
        return this.flagRepository.find({
            order: {
                favory: 'DESC',
                name: 'ASC',
            }
        });
    }


    findAllNoBase64(): Promise<FlagEntity[]> {
        return this.flagRepository.find({
            where: {flagBase64: null},
            order: {
                favory: 'DESC',
                name: 'ASC'
            }
        });
    }

    // Obtenir un pays par ID
    findOne(id: number): Promise<FlagEntity> {
        return this.flagRepository.findOneBy({id});
    }
    // Obtenir un pays par ID
    findOneByCurrencyName(name: string): Promise<FlagEntity> {
        return this.flagRepository.findOneBy({currencyName:name});
    }

    // Créer un nouvel pays
    create(flag: FlagEntity): Promise<FlagEntity> {
        return this.flagRepository.save(flag);
    }


    // Créer un nouvel pays
    update(flag: FlagEntity): Promise<FlagEntity> {
        return this.flagRepository.save(flag);
    }

    async bulkInsert(flags: FlagEntity[]): Promise<FlagEntity[]> {
        // Utiliser `insert()` pour une insertion massive
        await this.flagRepository.insert(flags);
        return this.findAll();
    }

    // Supprimer un pays
    async remove(id: number): Promise<void> {
        await this.flagRepository.delete(id);
    }

    // maj d'un flag
    async patch(id: number, flag: FlagEntity): Promise<FlagEntity[]> {
        await this.flagRepository.update(id, flag);
        return this.findAll();
    }
}