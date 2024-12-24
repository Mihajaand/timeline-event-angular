import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ReservationEntity} from "./Reservation.entity";
import {TablesEntity} from "./Tables.entity";
import {FlagEntity} from "./Flags.entity";
import {EvenementEntity} from "./Evenements.entity";

@Entity("configuration", {schema: "kesy"})
export class ConfigurationEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("varchar", {name: "name", length:255, nullable: false})
    name: string;

    @Column("json", {name: "value", nullable: false})
    value: string;

}

