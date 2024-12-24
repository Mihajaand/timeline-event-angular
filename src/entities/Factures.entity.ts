import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ClientEntity} from "./Client.entity";
import {StatutTicketEntity} from "./StatutsTickets.entity";
import {ReservationEntity} from "./Reservation.entity";
import {TypeFactureEntity} from "./TypesFactures.entity";
import {TicketEntity} from "./Tickets.entity";

@Entity('facture', {schema: "kesy"})
export class FactureEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column('varchar',{name:'name', length:255, nullable: false})
    name: string;

    @Column('varchar',{name:'code', length:20, nullable: false})
    code: string;

    @Column("datetime", {name: "date", nullable: false})
    date: Date;

    @Column("float", {name: "remise_pourcent", nullable: true, default:0})
    remisePourcent: number;

    @Column("float", {name: "remise_prix", nullable: true, default:0})
    remisePrix: number;

    @Column("float", {name: "montant_ht", nullable: true, default:0})
    montantHT: number;

    @Column("float", {name: "montant_tva", nullable: true, default:0})
    montantTVA: number;

    @Column("float", {name: "montant_ttc", nullable: true, default:0})
    montantTTC: number;

    @Column("float", {name: "reste_a_payer", nullable: true, default:0})
    restePayer: number;

    @Column('varchar',{name:'mode_paiement', length:255, nullable: true})
    modePaiement: string;

    @Column('text',{name:'commentaire',  nullable: true})
    commentaire: string;

    @Column("tinyint", { name: "etat", nullable: true, default:true })
    etat: boolean;

    @ManyToOne(() => TypeFactureEntity, (type) => type.factures, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "type_id", referencedColumnName: "id" }])
    type: TypeFactureEntity;

    @OneToOne(() => ReservationEntity, (reservation) => reservation.ticket, { nullable: true })
    @JoinColumn([{ name: "reservation_id", referencedColumnName: "id" }])
    reservation: ReservationEntity;

    @OneToOne(() => TicketEntity, (ticket) => ticket.facture, { nullable: true })
    @JoinColumn([{ name: "ticket_id", referencedColumnName: "id" }])
    ticket: ReservationEntity;

}
