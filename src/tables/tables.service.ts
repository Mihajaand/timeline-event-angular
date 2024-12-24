import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TablesEntity} from "../entities/Tables.entity";
import {DataSource, Repository} from "typeorm";
import {ConteneurType} from "../entities/Conteneur.type";

interface ReservationCount {
    nbTables: number;
    presents: number;
    type: string;
}

@Injectable()
export class TablesService {
    constructor(
        @InjectRepository(TablesEntity)
        private tablesRepository: Repository<TablesEntity>,
        private dataSource: DataSource
    ) {
    }

    // Obtenir touts les tables
    findAll(conteneur: ConteneurType, actif: number): Promise<TablesEntity[]> {
        //this.dataSource.setOptions({logging: true});
        return this.tablesRepository.find({
            where: {actif, conteneur},
            order: {
                nom: 'ASC'
            }
        });
    }

    // Obtenir une table par ID
    findOne(id: number): Promise<TablesEntity> {
        return this.tablesRepository.findOneBy({id});
    }

    // Créer une nouvelle table
    create(table: TablesEntity): Promise<TablesEntity> {
        return this.tablesRepository.save(table);
    }

    async patch(id: number, data: Partial<TablesEntity>): Promise<TablesEntity> {
        await this.tablesRepository.update(id, data);
        return this.findOne(id);
    }

    // Supprimer une table
    async remove(id: number): Promise<void> {
        await this.tablesRepository.delete(id);
    }

    async getTablesReport(startDate: string, endDate: string,conteneur: ConteneurType, actif: number): Promise<any> {

        return this.tablesRepository
            .createQueryBuilder("t1")
            .select("COUNT(t1.id) AS nb_tables")
            .addSelect("SUM(COALESCE(r.nb_person, 0)) AS presents")
            .addSelect("t1.type", 'type')
            .leftJoin('t1.reservations', "r", "r.tableId = t1.id AND r.actif = :actif AND r.begin >= :startDate AND r.end <= :endDate", {
                startDate,
                endDate,
                actif
            })
            .where('t1.conteneur= :conteneur',{conteneur})
            .groupBy("t1.type")
            .getRawMany();
    }

    async resumeReport(): Promise<any> {
        return await this.tablesRepository.createQueryBuilder('t')
            .select('t.type')
            .getManyAndCount()
    }
}