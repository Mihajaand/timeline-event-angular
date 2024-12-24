import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ConfigurationEntity} from "../entities/Configurations.entity";

@Injectable()
export class ConfigurationService {
    constructor(
        @InjectRepository(ConfigurationEntity)
        private configuratioRepository: Repository<ConfigurationEntity>,
    ) {
    }

    // Obtenir tous les configurations
    findAll(): Promise<ConfigurationEntity[]> {
        return this.configuratioRepository.find();
    }

    // Obtenir un configuration par ID
    findOne(id: number): Promise<ConfigurationEntity> {
        return this.configuratioRepository.findOne({where: {id}});
    }

    // Obtenir un configuration par ID
    async findOneByName(value: string): Promise<ConfigurationEntity> {
        return await this.configuratioRepository.findOneBy({name: value});
    }

    // Créer un nouvel configuration
    create(data: Partial<ConfigurationEntity>): Promise<ConfigurationEntity> {
        return this.configuratioRepository.save(data);
    }

    // Créer un nouvel configuration
    async patch(id: number, data: Partial<ConfigurationEntity>): Promise<ConfigurationEntity> {
        await this.configuratioRepository.update(id, data);
        return this.findOne(id);
    }

    // Supprimer un configuration
    async remove(id: number): Promise<ConfigurationEntity[]> {
        await this.configuratioRepository.delete(id);
        return await this.findAll();
    }
}
