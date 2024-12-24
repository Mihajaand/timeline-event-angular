import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ReservationEntity} from "./Reservation.entity";
import {ApiProperty} from "@nestjs/swagger";
import {ConteneurType} from "./Conteneur.type";

@Entity("tables", {schema: "kesy"})
export class TablesEntity {
    @ApiProperty()
    @Index()
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @ApiProperty({
        description: 'Nom de la table'
    })
    @Column("varchar", {name: "nom", length: 255})
    nom: string;

    @ApiProperty()
    @Column("int", {name: "nb_place"})
    nbPlace: number;

    @ApiProperty({
        description: 'Forme du conteneur',
        required: true,
        enum: ['simple', 'double', 'twin', 'ovale', 'rectangle', 'ronde', 'carre', 'rectangle']
    })
    @Column("varchar", {name: "forme", length: 255})
    forme: 'simple' | 'double' | 'twin' | 'ovale' | 'rectangle' | 'ronde' | 'carre' | 'rectangle';

    @ApiProperty()
    @Column("varchar", {name: "status", length: 255})
    status: string;

    @ApiProperty()
    @Column("varchar", {name: "couleur", length: 255})
    couleur: string;

    @ApiProperty()
    @Column("varchar", {name: "couleur_texte", length: 255})
    couleurTexte: string;

    @ApiProperty()
    @Column("varchar", {name: "emplacement", length: 255})
    emplacement: string;

    @ApiProperty()
    @Index()
    @Column("varchar", {name: "conteneur", length: 255, default: 'Restaurant', nullable: true})
    conteneur: ConteneurType;

    @ApiProperty()
    @Column("varchar", {name: "type", length: 255})
    type: string;

    @ApiProperty()
    @Column("int", {name: "variante"})
    variante: number;

    @ApiProperty()
    @Column("float", {name: "temperature", nullable: true})
    temperature: number;

    @ApiProperty()
    @Column("varchar", {name: "vue", length: 255,nullable: true})
    vue: number;

    @ApiProperty()
    @Column("varchar", {name: "batiment", length: 255,nullable: true})
    batiment: number;

    @ApiProperty()
    @Column("varchar", {name: "etage", length: 255,nullable: true})
    etage: number;

    @ApiProperty()
    @Column("varchar", {name: "reservit", length: 255,nullable: true})
    reservit: number;

    @ApiProperty()
    @Column("int", {name: "nb_clef", nullable: true, default: 0})
    nbClef: number;

    @ApiProperty()
    @Column("boolean", {name: "actif", default: true})
    actif: number;

    @OneToMany(() => ReservationEntity, (reservation) => reservation.table)
    reservations: ReservationEntity[];
}
