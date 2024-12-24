import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ClientEntity} from "./Client.entity";

@Entity("flag", {schema: "kesy"})
export class FlagEntity {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column()
    name: string;

    @Column()
    officialName: string;

    @Column()
    flagUrl: string;

    @Column("longtext", { name: "flag_base64", nullable: true })
    flagBase64: string;

    @Column("varchar", { name: "nationality", nullable: true, length: 255, default:'' })
    nationality: string;

    @Column("varchar", { name: "currency_code", nullable: true, length: 4, default:'' })
    currencyCode: string;

    @Column("varchar", { name: "currency_symbol", nullable: true, length: 10, default:'' })
    currencySymbol: string;

    @Column("varchar", { name: "currency_name", nullable: true, length: 255, default:'' })
    currencyName: string;

    @Column("boolean", { name: "favory", nullable: true,default:false })
    favory: string;

    @OneToMany(() => ClientEntity, (client) => client.pays)
    clients: ClientEntity[];
}
