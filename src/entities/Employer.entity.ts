import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ReservationEntity} from "./Reservation.entity";
import {TablesEntity} from "./Tables.entity";
import {FlagEntity} from "./Flags.entity";
import {EvenementEntity} from "./Evenements.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity("employer", {schema: "kesy"})
export class EmployerEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("varchar", {name: "civilite", length: 3, nullable: false})
    civilite: 'M.' | 'Me.' | 'Mle';

    @Column("varchar", {name: "nom", length: 255, nullable: false})
    nom: string;

    @Column("varchar", {name: "prenom", length: 255, nullable: false})
    prenom: string;

    @Column("varchar", {name: "tel", nullable: true, length: 255})
    tel: string | null;

    @Column("varchar", {name: "email", nullable: true, length: 255})
    email: string | null;

    @Column("date", {name: "date_naissance", nullable: true})
    dateNaissance: Date;

    @Column("varchar", {name: "couleur", nullable: true, length: 10})
    couleur: Date;

    @Column("varchar", {name: "couleur_texte", nullable: true, length: 10})
    couleurTexte: Date;

    @Column("varchar", {name: "obs", nullable: true, length: 255})
    observation: string | null;

    @ApiProperty()
    @Column("boolean", {name: "actif", default: true})
    actif: number;

    @OneToMany(() => ReservationEntity, (reservation) => reservation.employer1)
    reservations1: ReservationEntity[];

    @OneToMany(() => ReservationEntity, (reservation) => reservation.employer2)
    reservations2: ReservationEntity[];
}

