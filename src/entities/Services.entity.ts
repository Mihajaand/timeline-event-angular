import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ClientEntity} from "./Client.entity";

@Entity("service", {schema: "kesy"})
export class ServiceEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column('varchar',{name:'name', length:255, nullable: false})
    name: string;

    @Column('varchar',{name:'code', length:20, nullable: false})
    code: string;

    @Column("datetime", {name: "debut", nullable: false})
    debut: Date;

    @Column("datetime", {name: "fin", nullable: false})
    fin: Date;

    @Column("tinyint", { name: "etat", nullable: true, default:true })
    etat: boolean;
}
