import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ClientEntity} from "./Client.entity";
import {StockReservationEntity} from "./StocksReservations.entity";

@Entity("stock", {schema: "kesy"})
export class StockEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column()
    name: string;

    @Column("float")
    prix: number;

    @Column("varchar",{length:255})
    dureePrix: 'horaire'|'nuitee'|'hebdomadaire'|'mensuelle';

    @Column("int")
    qte: string;

    @OneToMany(() => StockReservationEntity, (stockReservation) => stockReservation.stock)
    stockReservations: StockReservationEntity[];

}
