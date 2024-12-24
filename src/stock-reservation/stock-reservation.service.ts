import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FlagEntity} from "../entities/Flags.entity";
import {Repository} from "typeorm";
import {StockReservationEntity} from "../entities/StocksReservations.entity";

@Injectable()
export class StockReservationService {
    constructor(
        @InjectRepository(StockReservationEntity)
        private stockReservationRepository: Repository<StockReservationEntity>,
    ) {
    }

    // Obtenir tous les stock
    findAll(): Promise<StockReservationEntity[]> {
        return this.stockReservationRepository.find({
            relations: ["stock","reservation"]
        });
    }

    // Obtenir un stock par ID
    findOne(id: number): Promise<StockReservationEntity> {
        return this.stockReservationRepository.findOneBy({id});
    }

    // Créer un nouveau stock
    create(stokReservation: StockReservationEntity): Promise<StockReservationEntity> {
        return this.stockReservationRepository.save(stokReservation);
    }


    // Créer un nouveau stock
    update(id,stokReservation: StockReservationEntity): Promise<StockReservationEntity> {
        return this.stockReservationRepository.save(stokReservation);
    }

    // Supprimer un stock
    async remove(id: number): Promise<void> {
        await this.stockReservationRepository.delete(id);
    }
}
