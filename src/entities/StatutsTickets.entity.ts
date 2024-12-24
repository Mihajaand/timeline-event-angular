import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ClientEntity} from "./Client.entity";
import {TicketEntity} from "./Tickets.entity";
import {ReservationEntity} from "./Reservation.entity";

@Entity('statut_ticket', {schema: "kesy"})
export class StatutTicketEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column('varchar',{name:'name', length:255, nullable: false})
    name: string;

    @Column('varchar',{name:'code', length:20, nullable: false})
    code: string;

    @Column('varchar',{name:'couleur', length:20, nullable: true})
    couleur: string;

    @Column('varchar',{name:'couleur_texte', length:20, nullable: true})
    couleurTexte: string;

    @Column("varchar", { name: "statut", nullable: true, default:'en cours' })
    statut: 'en cours'|'termine';

    @OneToMany(() => TicketEntity, (ticket) => ticket.statut)
    tickets: TicketEntity[];

}
