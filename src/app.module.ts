import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TablesModule} from "./tables/tables.module";
import {ReservationsModule} from './reservations/reservations.module';
import {ClientsModule} from './clients/clients.module';
import {EvenementsModule} from './evenements/evenements.module';
import {FlagsModule} from "./flags/flags.module";
import {TicketModule} from './ticket/ticket.module';
import {FactureModule} from './facture/facture.module';
import {TypeFactureModule} from './type_facture/type_facture.module';
import {StatutTicketModule} from './statut_ticket/statut_ticket.module';
import {ServiceModule} from './service/service.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { CurencyRateModule } from './curency-rate/curency-rate.module';
import { StockModule } from './stock/stock.module';
import { StockReservationModule } from './stock-reservation/stock-reservation.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { EmployerModule } from './employer/employer.module';
import { OrchestrateurModule } from './orchestrateur/orchestrateur.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Rend les variables d'environnement disponibles dans toute l'application
            envFilePath: [`.env.${process.env.NODE_ENV}`,'.env'], // Charge les variables à partir du fichier .env
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService) => ({
                type: configService.get('DB_TYPE'),
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USER'),  // Remplacez par votre utilisateur MySQL
                password: configService.get('DB_PASS'),  // Remplacez par votre mot de passe MySQL
                database: configService.get('DB_NAME'),  // Nom de la base de données
                entities: [__dirname + '/**/*.entity.{js,ts}'],
                synchronize: true,  // Synchronisation automatique des entités avec la base de données
                //logging: false,
            }),
            inject: [ConfigService],
        }),
        TablesModule,
        ReservationsModule,
        ClientsModule,
        EvenementsModule,
        FlagsModule,
        TicketModule,
        FactureModule,
        TypeFactureModule,
        StatutTicketModule,
        ServiceModule,
        CurencyRateModule,
        StockModule,
        StockReservationModule,
        ConfigurationsModule,
        EmployerModule,
        OrchestrateurModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
