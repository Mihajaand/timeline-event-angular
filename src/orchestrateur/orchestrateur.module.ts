import {Module} from '@nestjs/common';
import {OrchestrateurService} from './orchestrateur.service';
import {OrchestrateurController} from './orchestrateur.controller';
import {TablesService} from "../tables/tables.service";
import {ReservationsService} from "../reservations/reservations.service";
import {EvenementsService} from "../evenements/evenements.service";
import {EmployerService} from "../employer/employer.service";
import {FlagsService} from "../flags/flags.service";
import {CurencyRateService} from "../curency-rate/curency-rate.service";
import {ConfigurationService} from "../configurations/configurations.service";
import {ClientsService} from "../clients/clients.service";
import {ServiceService} from "../service/service.service";
import {StockService} from "../stock/stock.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReservationEntity} from "../entities/Reservation.entity";
import {TablesEntity} from "../entities/Tables.entity";
import {EvenementEntity} from "../entities/Evenements.entity";
import {EmployerEntity} from "../entities/Employer.entity";
import {FlagEntity} from "../entities/Flags.entity";
import {CurencyRateEntity} from "../entities/CurencyRates.entity";
import {ConfigurationEntity} from "../entities/Configurations.entity";
import {ClientEntity} from "../entities/Client.entity";
import {ServiceEntity} from "../entities/Services.entity";
import {StockEntity} from "../entities/Stocks.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReservationEntity]),
        TypeOrmModule.forFeature([TablesEntity]),
        TypeOrmModule.forFeature([EvenementEntity]),
        TypeOrmModule.forFeature([EmployerEntity]),
        TypeOrmModule.forFeature([FlagEntity]),
        TypeOrmModule.forFeature([CurencyRateEntity]),
        TypeOrmModule.forFeature([ConfigurationEntity]),
        TypeOrmModule.forFeature([ClientEntity]),
        TypeOrmModule.forFeature([ServiceEntity]),
        TypeOrmModule.forFeature([StockEntity]),
    ],
    providers: [OrchestrateurService, TablesService, ReservationsService, EvenementsService, EmployerService, FlagsService, CurencyRateService,
        ConfigurationService, ClientsService, ServiceService, StockService],
    controllers: [OrchestrateurController]
})
export class OrchestrateurModule {
}
