import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LessThanOrEqual, MoreThanOrEqual, Repository} from "typeorm";
import {StockEntity} from "../entities/Stocks.entity";

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(StockEntity)
        private stockRepository: Repository<StockEntity>,
    ) {
    }

    // Obtenir tous les stock
    async findAll(debut, fin): Promise<StockEntity[]> {
        //return this.stockRepository.find({relations:[]});
        const query = this.stockRepository.createQueryBuilder('stock')
            .leftJoinAndSelect('stock.stockReservations','sr',"STR_TO_DATE(CONCAT(sr.begin,' ',sr.begin_hour),'%Y-%m-%d %H:%i') >= :debut AND STR_TO_DATE(CONCAT(sr.end,' ',sr.end_hour),'%Y-%m-%d %H:%i') <= :fin",{debut,fin})
            .leftJoinAndSelect("sr.reservation",'r')
        ;
        return await query.getMany();
    }

    // Obtenir un stock par ID
    findOne(id: number): Promise<StockEntity> {
        return this.stockRepository.findOneBy({id});
    }

    // Créer un nouveau stock
    create(stock: StockEntity): Promise<StockEntity> {
        return this.stockRepository.save(stock);
    }


    // modification un nouveau stock
    update(id, stock: StockEntity): Promise<StockEntity> {
        return this.stockRepository.save(stock);
    }

    // Supprimer un stock
    async remove(id: number): Promise<void> {
        await this.stockRepository.delete(id);
    }
}
