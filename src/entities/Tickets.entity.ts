import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ClientEntity} from "./Client.entity";
import {StatutTicketEntity} from "./StatutsTickets.entity";
import {ReservationEntity} from "./Reservation.entity";
import {FactureEntity} from "./Factures.entity";

@Entity('ticket', {schema: "kesy"})
export class TicketEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column('varchar', {name: 'name', length: 255, nullable: false})
    name: string;

    @Column('varchar', {name: 'code', length: 20, nullable: false})
    code: string;

    @Column("datetime", {name: "date", nullable: false})
    date: Date;

    @Column("float", {name: "remise_pourcent", nullable: true, default: 0})
    remisePourcent: number;

    @Column("float", {name: "remise_prix", nullable: true, default: 0})
    remisePrix: number;

    @Column("float", {name: "montant_ht", nullable: true, default: 0})
    montantHT: number;

    @Column("float", {name: "montant_tva", nullable: true, default: 0})
    montantTVA: number;

    @Column("float", {name: "montant_ttc", nullable: true, default: 0})
    montantTTC: number;

    @Column('text', {name: 'commentaire', nullable: true})
    commentaire: string;

    @Column("tinyint", {name: "etat", nullable: true, default: true})
    etat: boolean;

    @ManyToOne(() => StatutTicketEntity, (statut) => statut.tickets, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "statut_id", referencedColumnName: "id"}])
    statut: StatutTicketEntity;

    @OneToOne(() => ReservationEntity, (reservation) => reservation.ticket, {nullable: true})
    @JoinColumn([{name: "reservation_id", referencedColumnName: "id"}])
    reservation: ReservationEntity;

    @OneToOne(() => FactureEntity, (facture) => facture.ticket, {nullable: true})
    @JoinColumn([{name: "facture_id", referencedColumnName: "id"}])
    facture: FactureEntity;

}
