import {Controller, Get, Query} from '@nestjs/common';
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
import {ReservationEntity} from "../entities/Reservation.entity";
import {TablesEntity} from "../entities/Tables.entity";
import {EvenementEntity} from "../entities/Evenements.entity";
import {ClientEntity} from "../entities/Client.entity";
import {FlagEntity} from "../entities/Flags.entity";
import {StockEntity} from "../entities/Stocks.entity";
import {CurencyRateEntity} from "../entities/CurencyRates.entity";
import {EmployerEntity} from "../entities/Employer.entity";
import {ConfigurationEntity} from "../entities/Configurations.entity";
import {ServiceEntity} from "../entities/Services.entity";
import {ApiQuery} from "@nestjs/swagger";
import {ConteneurType} from "../entities/Conteneur.type";

@Controller('orchestrateur')
export class OrchestrateurController {
    constructor(
        private tableService: TablesService,
        private reservationService: ReservationsService,
        private evenementService: EvenementsService,
        private employerService: EmployerService,
        private flagService: FlagsService,
        private curencyRateService: CurencyRateService,
        private configurationService: ConfigurationService,
        private clientService: ClientsService,
        private serviceService: ServiceService,
        private stockService: StockService) {
    }

    @Get()
    @ApiQuery({
        name: "begin",
        description: "Date de début sous forme YYYY-MM-DD",
        type: String,
        required: true,
    })
    @ApiQuery({
        name: "end",
        description: "Date de fin sous forme YYYY-MM-DD",
        type: String,
        required: false,
    })
    @ApiQuery({
        name: "conteneur",
        description: "Date de fin sous forme YYYY-MM-DD",
        type: String,
        default: 'Restaurant',
        required: false,
    })
    @ApiQuery({
        name: "actif",
        description: "Actif ou non",
        type: Number,
        default: 1,
        required: false,
    })
    async findAll(
        @Query('begin') begin: string,
        @Query('end') end: string,
        @Query('conteneur') conteneur: ConteneurType = 'Restaurant',
        @Query('actif') actif: number = 1
    ): Promise<OrchestratorInterface> {
        if (end == null || end == '') {
            end = begin;
        }
        let beginDate: Date;
        let endDate: Date;
        if (begin == '') {
            beginDate = new Date();
        } else {
            beginDate = new Date(begin);
        }
        beginDate.setUTCHours(0, 0, 0, 0);
        if (end == '') {
            endDate = new Date();
        } else {
            endDate = new Date(begin);
        }
        endDate.setUTCHours(23, 59, 59, 999);
        let tomorrow = (new Date(end));
        tomorrow.setDate(tomorrow.getDate() + 1);
        const reservations = await this.reservationService.findAll(begin, end, conteneur, actif);
        const conteneurs = await this.tableService.findAll(conteneur, actif);
        const evenements = await this.evenementService.findAll(begin, tomorrow.toISOString().split('T')[0]);
        const yearEvenements = await this.evenementService.findAll(beginDate.getFullYear() + '-01-01', endDate.getFullYear() + '-12-31');
        const clients = await this.clientService.findAll();
        const flags = await this.flagService.findAll();
        const employers = await this.employerService.findAll(conteneur);
        const configurations = await this.configurationService.findAll();
        const services = await this.serviceService.findAll(actif, beginDate, endDate);
        const stocks = await this.stockService.findAll(begin, end);
        let currencyRates = await this.curencyRateService.findAll(beginDate);
        if (currencyRates.length == 0) {
            currencyRates = await this.curencyRateService.getExchangeRate(beginDate);
        }
        //const reportData = await this.getReportingData(reservations, conteneurs, configurations);
        return {
            conteneurs,
            reservations,
            evenements,
            yearEvenements,
            clients,
            flags,
            stocks,
            currencyRates,
            employers,
            configurations,
            services
        };
    }

    getReportingData(reservations: any[], tables: TablesEntity[], configs) {
        let options;
        const response = {
            totals: {},
            nbTables: {},
            nbPers: {}
        }
        configs.forEach(c => {
            if (c.name == 'parametres') {
                options = c.value;
            }
        });
        const dateStr = new Date();
        const durationDispo = this.minutesDiff(new Date(dateStr.toISOString().split('T')[0] + ' ' + options.beginHour), new Date(dateStr.toISOString().split('T')[0] + ' ' + options.endHour));
        const nbStepDispo = durationDispo / options.step;
        let nbPers = 0;
        for (let table of tables) {
            if (response[table[options.reportColumn]] == undefined) {
                response[table[options.reportColumn]] = {
                    nbTablesDispo: 0,
                    nbTablesOcc: 0,
                    nbPersDispo: 0,
                    nbPersOcc: 0,
                    percTablesDispo: 100,
                    percTablesOcc: 0,
                    percPersDispo: 100,
                    percPersOcc: 0,
                    data: {}
                }

            }
            nbPers += table.nbPlace;
            if (response.nbPers[table[options.reportColumn]] == undefined) {
                response.nbPers[table[options.reportColumn]] = 0;
            }
            response.nbPers[table[options.reportColumn]] += table.nbPlace;

            if (response.nbTables[table[options.reportColumn]] == undefined) {
                response.nbTables[table[options.reportColumn]] = 0;
            }
            response.nbTables[table[options.reportColumn]] += 1;

            response[table[options.reportColumn]].nbTablesDispo += 1;
            response[table[options.reportColumn]].nbPersDispo += table.nbPlace;
            for (let j = 0; j < nbStepDispo; j++) {
                const hour = this.addMinutes(options.beginHour, options.step * j);
                response[table[options.reportColumn]].data[hour] = {
                    nbTablesDispo: tables.filter(t => t[options.reportColumn] == table[options.reportColumn]).length,
                    nbPersDispo: response.nbPers[table[options.reportColumn]],
                    nbTablesOcc: 0,
                    nbPersOcc: 0,
                    percTablesDispo: 100,
                    percPersDispo: 100,
                    percTablesOcc: 0,
                    percPersOcc: 0,
                    color:'#FFFFFF',
                }
            }
        }
        for (let j = 0; j < nbStepDispo; j++) {
            const hour = this.addMinutes(options.beginHour, options.step * j);
            response.totals[hour] = {
                nbTablesDispo: tables.length,
                nbPersDispo: nbPers,
                nbTablesOcc: 0,
                nbPersOcc: 0,
                percTablesDispo: 100,
                percPersDispo: 100,
                percTablesOcc: 0,
                percPersOcc: 0,
            }
        }
        reservations.forEach((reservation: ReservationEntity) => {
            response[reservation.table[options.reportColumn]].nbTablesOcc += 1;
            response[reservation.table[options.reportColumn]].nbTablesDispo -= 1;
            response[reservation.table[options.reportColumn]].nbPersOcc += reservation.nbPerson;
            response[reservation.table[options.reportColumn]].nbPersDispo -= reservation.nbPerson;
            response[reservation.table[options.reportColumn]].percTablesOcc = Number(Number(response[reservation.table[options.reportColumn]].nbTablesOcc * 100 / response.nbTables[reservation.table[options.reportColumn]]).toFixed(2));
            response[reservation.table[options.reportColumn]].percTablesDispo = 100 - response[reservation.table[options.reportColumn]].percTablesOcc;
            response[reservation.table[options.reportColumn]].percPersOcc = Number(Number(response[reservation.table[options.reportColumn]].nbPersOcc * 100 / response.nbPers[reservation.table[options.reportColumn]]).toFixed(2));
            response[reservation.table[options.reportColumn]].percPersDispo = Number(100 - response[reservation.table[options.reportColumn]].percPersOcc);
            const eventDuration = this.minutesDiff(new Date(reservation.begin + ' ' + reservation.beginHour), new Date(reservation.end + ' ' + reservation.endHour));
            const nbStep = eventDuration / options.step;
            for (let i = 0; i < nbStep; i++) {
                const hour = this.addMinutes(reservation.beginHour, options.step * i);
                if (response[reservation.table[options.reportColumn]].data[hour] == undefined) {
                    response[reservation.table[options.reportColumn]].data[hour] = {
                        nbTablesDispo: reservation.table.nbPlace,
                        nbPersDispo: response.nbPers[reservation.table[options.reportColumn]],
                        nbTablesOcc: 0,
                        nbPersOcc: 0,
                        percTablesDispo: 100,
                        percPersDispo: 100,
                        percTablesOcc: 0,
                        percPersOcc: 0,
                        color:'#FFFFFF',
                    }
                }

                response[reservation.table[options.reportColumn]].data[hour].nbTablesDispo -= 1;
                response[reservation.table[options.reportColumn]].data[hour].nbPersDispo -= reservation.nbPerson;
                response[reservation.table[options.reportColumn]].data[hour].nbTablesOcc += 1;
                response[reservation.table[options.reportColumn]].data[hour].nbPersOcc += reservation.nbPerson;
                response[reservation.table[options.reportColumn]].data[hour].percTablesOcc = Number(Number(response[reservation.table[options.reportColumn]].data[hour].nbTablesOcc * 100 / response.nbTables[reservation.table[options.reportColumn]]).toFixed(2));
                response[reservation.table[options.reportColumn]].data[hour].percTablesDispo = 100 - response[reservation.table[options.reportColumn]].data[hour].percTablesOcc;
                response[reservation.table[options.reportColumn]].data[hour].percPersOcc = Number(Number(response[reservation.table[options.reportColumn]].data[hour].nbPersOcc * 100 / response.nbPers[reservation.table[options.reportColumn]]).toFixed(2));
                response[reservation.table[options.reportColumn]].data[hour].percPersDispo = Number(100 - response[reservation.table[options.reportColumn]].data[hour].percPersOcc);
                response.totals[hour].nbTablesDispo -= 1;
                response.totals[hour].nbPersDispo -= reservation.nbPerson;
                response.totals[hour].nbTablesOcc += 1;
                response.totals[hour].nbPersOcc += reservation.nbPerson;
                response.totals[hour].percTablesOcc = Number(Number(response.totals[hour].nbTablesOcc * 100 / response.totals[hour].nbTablesDispo).toFixed(2));
                response.totals[hour].percPersOcc = Number(Number(response.totals[hour].nbPersOcc * 100 / response.totals[hour].nbPersDispo).toFixed(2));
                response.totals[hour].percTablesDispo = 100 - response.totals[hour].percTablesOcc;
                response.totals[hour].percPersDispo = 100 - response.totals[hour].percPersOcc;
            }
        });
        return Promise.resolve(response);
    }

    minutesDiff(begin, end) {
        let differenceValue = (end.getTime() - begin.getTime()) / 1000;
        differenceValue /= 60;
        return Math.abs(Math.round(differenceValue));
    }

    addMinutes(time, minsToAdd) {
        var piece = time.split(':');
        var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

        return this.D(mins % (24 * 60) / 60 | 0) + ':' + this.D(mins % 60);
    }

    D(J) {
        return (J < 10 ? '0' : '') + J;
    }
}

export interface OrchestratorInterface {
    conteneurs: TablesEntity[],
    reservations: ReservationEntity[],
    evenements: EvenementEntity[],
    yearEvenements: EvenementEntity[],
    clients: ClientEntity[],
    flags: FlagEntity[],
    stocks: StockEntity[],
    currencyRates: CurencyRateEntity[],
    employers: EmployerEntity[],
    configurations: ConfigurationEntity[],
    services: ServiceEntity[],
    reportData?: any
}