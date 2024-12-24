import {Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ReservationEntity} from "./Reservation.entity";
import {TablesEntity} from "./Tables.entity";
import {ClientEntity} from "./Client.entity";

@Entity("evenement", {schema: "kesy"})
export class EvenementEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    @Index()
    id: number;

    @Column("varchar", {name: "nom", length: 255})
    nom: string;

    @Column("datetime", {name: "debut", nullable: false})
    @Index()
    debut: Date;

    @Column("varchar", {name: "heure_debut", length: 5, nullable: false})
    heureDebut: string;

    @Column("datetime", {name: "fin", nullable: false})
    @Index()
    fin: Date;

    @Column("varchar", {name: "heure_fin", length: 5, nullable: false})
    heureFin: string;

    @Column("varchar", {name: "couleur", length: 15, nullable: true})
    couleur: string | null;

    @Column("varchar", {name: "couleur_texte", length: 15, nullable: true})
    couleurTexte: string | null;


}
