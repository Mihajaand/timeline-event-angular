import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ClientEntity} from "./Client.entity";
import {TablesEntity} from "./Tables.entity";
import {ReservationEntity} from "./Reservation.entity";
import {StockEntity} from "./Stocks.entity";

@Entity("stock_reservation", {schema: "kesy"})
export class StockReservationEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("varchar", { name: "begin", length: 10 })
    begin: string;

    @Column("varchar", { name: "end", length: 10 })
    end: string;

    @Column("varchar", { name: "begin_hour", length: 5 })
    beginHour: string;

    @Column("varchar", { name: "end_hour", length: 5 })
    endHour: string;

    @Column("float")
    montant: number;

    @ManyToOne(() => ReservationEntity, (reservations) => reservations.stockReservations, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "reservation_id", referencedColumnName: "id" }])
    reservation: ReservationEntity;

    @ManyToOne(() => StockEntity, (stocks) => stocks.stockReservations, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "stock_id", referencedColumnName: "id" }])
    stock: StockEntity;

}
