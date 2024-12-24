import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ReservationEntity} from "./Reservation.entity";
import {TablesEntity} from "./Tables.entity";
import {FlagEntity} from "./Flags.entity";
import {EvenementEntity} from "./Evenements.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity("client", {schema: "kesy"})
export class ClientEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @ApiProperty()
    @Column("varchar", {name: "categorie", length: 20, nullable: false, default: 'particulier'})
    categorieClient: 'particulier' | 'societe';

    @ApiProperty()
    @Column("varchar", {name: "ref", length: 20, nullable: false})
    ref: string;

    @ApiProperty()
    @Column("varchar", {name: "raison_sociale", length: 255, nullable: true})
    raisonSociale: string;

    @ApiProperty()
    @Column("varchar", {name: "nif", length: 255, nullable: true})
    nif: string;

    @ApiProperty()
    @Column("varchar", {name: "cif", length: 255, nullable: true})
    cif: string;

    @ApiProperty()
    @Column("varchar", {name: "stat", length: 255, nullable: true})
    stat: string;

    @ApiProperty()
    @Column("varchar", {name: "civilite", length: 6, nullable: true})
    civilite: 'M.' | 'Me.' | 'Mle'|'Me. M.'|'M. Me.'|'Mss.'|'Mr.'|'Mi.'|'Dr.';

    @ApiProperty()
    @Column("varchar", {name: "nom", length: 255, nullable: true})
    nom: string;

    @ApiProperty()
    @Column("varchar", {name: "prenom", length: 255, nullable: true})
    prenom: string;

    @ApiProperty()
    @Column("varchar", {name: "tel", nullable: true, length: 255})
    tel: string | null;

    @ApiProperty()
    @Column("varchar", {name: "tel2", nullable: true, length: 255})
    tel2: string | null;

    @ApiProperty()
    @Column("varchar", {name: "email", nullable: true, length: 255})
    email: string | null;

    @ApiProperty()
    @Column("date", {name: "date_naissance", nullable: true})
    dateNaissance: Date;

    @ApiProperty()
    @Column("varchar", {name: "obs", nullable: true, length: 255})
    observation: string | null;

    @OneToMany(() => ReservationEntity, (reservation) => reservation.client)
    reservations: ReservationEntity[];

    @ManyToOne(() => FlagEntity, (flags) => flags.clients, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "pays_id", referencedColumnName: "id"}])
    pays: FlagEntity;
}

