import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ReservationEntity} from "./Reservation.entity";
import {TablesEntity} from "./Tables.entity";
import {FlagEntity} from "./Flags.entity";
import {EvenementEntity} from "./Evenements.entity";

@Entity("curency_rate", {schema: "kesy"})
export class CurencyRateEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("varchar", {name: "curency_code", length: 3, nullable: false})
    curencyCode: string;

    @Column("varchar", {name: "curencyName", length: 255, nullable: false})
    curencyName: string;

    @Column("date", {name: "date", nullable: false})
    date: Date;

    @Column("float", {name: "amount", nullable: false})
    amount: number;

    @Column("text", {name: "flag", nullable: true})
    flag: string;

}

