import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClientEntity } from "./Client.entity";
import { TablesEntity } from "./Tables.entity";
import {TicketEntity} from "./Tickets.entity";
import {StockReservationEntity} from "./StocksReservations.entity";
import {EmployerEntity} from "./Employer.entity";

@Index("IDX_42C8495519EB6921", ["clientId"], {})
@Index("IDX_42C84955ECFF285C", ["tableId"], {})
@Entity("reservation", { schema: "kesy" },)
export class ReservationEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  @Index()
  id: number;

  @Column("varchar", { name: "begin", length: 10 })
  @Index()
  begin: string;

  @Column("varchar", { name: "end", length: 10 })
  @Index()
  end: string;

  @Column("int", { name: "client_id", nullable: true })
  clientId: number | null;

  @Column("int", { name: "table_id", nullable: true })
  tableId: number | null;

  @Column("varchar", { name: "begin_hour", length: 5 })
  beginHour: string;

  @Column("varchar", { name: "end_hour", length: 5 })
  endHour: string;

  @Column("int", { name: "status" })
  status: number;

  @Column("int", { name: "top_pos", nullable: true })
  topPos: number | null;

  @Column("int", { name: "left_pos", nullable: true })
  leftPos: number | null;

  @Column("decimal", { name: "width", nullable: true, precision: 10, scale: 0 })
  width: string | null;

  @Column("varchar", { name: "event_text", nullable: true, length: 255 })
  eventText: string | null;

  @Column("tinyint", { name: "actif", width: 1 })
  @Index()
  actif: boolean;

  @Column("int", { name: "nb_person" })
  nbPerson: number;


  @Column("text", { name: "commentaire" })
  commentaire: string;

  @ManyToOne(() => ClientEntity, (client) => client.reservations, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "id" }])
  client: ClientEntity;

  @ManyToOne(() => EmployerEntity, (employer1) => employer1.reservations1, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "employer1", referencedColumnName: "id" }])
  employer1: EmployerEntity;

  @ManyToOne(() => EmployerEntity, (employer2) => employer2.reservations2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "employer2", referencedColumnName: "id" }])
  employer2: EmployerEntity;

  @ManyToOne(() => TablesEntity, (tables) => tables.reservations, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "table_id", referencedColumnName: "id" }])
  table: TablesEntity;

  @OneToOne(() => TicketEntity, (ticket) => ticket.reservation, { nullable: true })
  @JoinColumn([{ name: "ticket_id", referencedColumnName: "id" }])
  ticket: TicketEntity;

  @OneToMany(() => StockReservationEntity, (stockReservation) => stockReservation.reservation)
  stockReservations: StockReservationEntity[];
}
