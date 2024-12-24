import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, getConnection, getManager, Repository} from 'typeorm';
import {ReservationEntity} from "../entities/Reservation.entity";
import {UpdateReservationDto} from "./reservation.dto";
import {formatQueryWithParameters} from "../main";

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(ReservationEntity)
        private reservationsRepository: Repository<ReservationEntity>
    ) {
    }

    // Obtenir tous les réservations
    findAll(begin, end, conteneur, actif): Promise<ReservationEntity[]> {
        //this.dataSource.setOptions({logging: true});
        const query = this.reservationsRepository.createQueryBuilder('r')
            .leftJoinAndSelect('r.table', 't')
            .leftJoinAndSelect('r.client', 'c')
            .leftJoinAndSelect('c.pays', 'p')
            .leftJoinAndSelect('r.employer1', 'e1')
            .leftJoinAndSelect('r.employer2', 'e2')
            .where('r.begin >= :begin', {begin})
            .andWhere('r.end <= :end', {end})
            .andWhere("t.conteneur = :conteneur", {conteneur})
            .andWhere('r.actif = :actif', {actif});
        return query.getMany();
    }

    // Obtenir un réservation par ID
    findOne(id: number): Promise<ReservationEntity> {
        return this.reservationsRepository.findOne({
            where: {id},
            relations: ['table', 'client', 'client.pays','employer1','employer2']
        });
    }

    // Créer un nouvel réservation
    async create(reservation: ReservationEntity): Promise<ReservationEntity> {
        const resa = await this.reservationsRepository.save(reservation);
        return this.findOne(resa.id);
    }

    async update(id: number, updateUserDto: UpdateReservationDto): Promise<ReservationEntity> {
        await this.reservationsRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    // mettre à jour un nouvel réservation
    async patch(id: number, reservation: ReservationEntity): Promise<ReservationEntity> {
        await this.reservationsRepository.update(id, reservation);
        return this.findOne(id);
    }

    // Supprimer un réservation
    async remove(id: number): Promise<void> {
        await this.reservationsRepository.delete(id);
    }


}