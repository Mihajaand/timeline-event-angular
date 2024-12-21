import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {addMinutes, minutesDiff, stringToDate, timeFormat} from "../../utils/generic.utils";
import {TimelineOptionInterface} from "../../interfaces/timelineOption.interface";
import {CommonModule} from "@angular/common";
import {ContextMenuModule} from "@perfectmemory/ngx-contextmenu";
import {IonBadge, IonIcon, IonItem, IonLabel} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {checkmarkCircleOutline, closeCircleOutline} from "ionicons/icons";
import {ReportingDataInterface, ReportingDataTotalsInterface} from "../../interfaces/ReportingData.interface";

@Component({
    selector: 'kesy-calendar-report-pane',
    templateUrl: './report-pane.component.html',
    standalone: true,
    imports: [CommonModule, ContextMenuModule, IonItem, IonIcon, IonLabel, IonBadge],
    styleUrls: ['./report-pane.component.scss'],
})
export class ReportPaneComponent implements OnInit {
    @Input() options: TimelineOptionInterface = {
        rank: "Hotel",
        beginHour: "09:00",
        endHour: "21:00",
        step: 15,
        reportColumn: 'type'
    };

    @Input() set allReservations(reservations) {
        this.all_reservations = reservations;
        //this.parseData();
    }

    @ViewChildren('reportHourLines') reportHourLines: QueryList<ElementRef>;
    @ViewChildren('reportStockLines') reportStockLines: QueryList<ElementRef>;
    @ViewChild('hourLines') hourLines!: ElementRef;
    @ViewChild('stockHourLines') stockHourLines!: ElementRef;
    @Input() choixActuel: string = 'Restaurant';
    leftPos;

    @Input() set scrollLeft(l) {
        this.leftPos = l;
        const $this = this;
        if (this.reportHourLines !== undefined) {
            this.reportHourLines.forEach((reportHour, index) => {
                reportHour.nativeElement.scrollTo({
                    left: $this.leftPos,
                    behavior: 'instant',
                });
            });
        }

        if (this.reportStockLines !== undefined) {
            this.reportStockLines.forEach((reportStock, index) => {
                reportStock.nativeElement.scrollTo({
                    left: $this.leftPos,
                    behavior: 'instant',
                });
            });
        }
        if (this.stockHourLines !== undefined)
            this.stockHourLines.nativeElement.scrollTo({
                left: this.leftPos,
                behavior: 'instant',
            });
        if (this.hourLines !== undefined)
            this.hourLines.nativeElement.scrollTo({
                left: this.leftPos,
                behavior: 'instant',
            });
    }

    all_reservations = [];
    tables = [];
    @Input() leftColumnWidth: Number = 0;
    @Input() oneLeftColumnWidth: Number = 0;
    @Input() stocks = [];
    data: any;
    totals: ReportingDataTotalsInterface;

    @Input() reportTables;

    @Input() personBase64: string = '';
    @Input() columnWidth: Number = 100;
    showTotalsAsNumber: boolean = true;
    showDisponible: boolean = true;

    @Input() set all_tables(t) {
        this.tables = t;
    }

    loaded: boolean = false;
    keys: string[] = [];

    @Input() set loading(l) {
        this.loaded = l;
        if (this.loaded) {
            this.data = this.getReportingData();
            this.totals = this.data.totals;
            this.keys = Object.keys(this.data.nbTables);
        }
    }

    events = [];

    @Input() set allEvenements(e: any[]) {
        if (e != undefined && e.length > 0) {
            this.events = e;
            //this.parseData();

        }
    }

    allHours: any[] = [];

    @Input() set hours(h) {
        this.allHours = h;
    }


    constructor() {
        addIcons({
            closeCircleOutline,
            checkmarkCircleOutline
        });
    }

    ngOnInit() {
        this.columnWidth = this.options.columnWidth | 100;
        this.reportTables = [];
    }


    getColor(hour, defaultColor) {
        /*const index = this.hoursBgColors.findIndex(h=>h.hour == hour);
        return index >-1 ? this.hoursBgColors[index].color:defaultColor;*/
    }

    getReportingData() {
        const response = {
            totals: {},
            nbTables: {},
            nbPers: {}
        }
        const dateStr = new Date();
        const durationDispo = minutesDiff(new Date(dateStr.toISOString().split('T')[0] + ' ' + this.options.beginHour), new Date(dateStr.toISOString().split('T')[0] + ' ' + this.options.endHour));
        const nbStepDispo = durationDispo / this.options.step;
        let nbPers = 0;
        for (let table of this.tables) {
            if (response[table[this.options.reportColumn]] == undefined) {
                response[table[this.options.reportColumn]] = {
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
            if (response.nbPers[table[this.options.reportColumn]] == undefined) {
                response.nbPers[table[this.options.reportColumn]] = 0;
            }
            response.nbPers[table[this.options.reportColumn]] += table.nbPlace;

            if (response.nbTables[table[this.options.reportColumn]] == undefined) {
                response.nbTables[table[this.options.reportColumn]] = 0;
            }
            response.nbTables[table[this.options.reportColumn]] += 1;

            response[table[this.options.reportColumn]].nbTablesDispo += 1;
            response[table[this.options.reportColumn]].nbPersDispo += table.nbPlace;
            for (let j = 0; j < nbStepDispo; j++) {
                const hour = addMinutes(this.options.beginHour, this.options.step * j);
                response[table[this.options.reportColumn]].data[hour] = {
                    nbTablesDispo: this.tables.filter(t => t[this.options.reportColumn] == table[this.options.reportColumn]).length,
                    nbPersDispo: response.nbPers[table[this.options.reportColumn]],
                    nbTablesOcc: 0,
                    nbPersOcc: 0,
                    percTablesDispo: 100,
                    percPersDispo: 100,
                    percTablesOcc: 0,
                    percPersOcc: 0,
                    color: '#FFFFFF',
                }
            }
        }
        for (let j = 0; j < nbStepDispo; j++) {
            const hour = addMinutes(this.options.beginHour, this.options.step * j);
            response.totals[hour] = {
                nbTablesDispo: this.tables.length,
                nbPersDispo: nbPers,
                nbTablesOcc: 0,
                nbPersOcc: 0,
                percTablesDispo: 100,
                percPersDispo: 100,
                percTablesOcc: 0,
                percPersOcc: 0,
            }
        }
        this.all_reservations.forEach((reservation) => {
            response[reservation.table[this.options.reportColumn]].nbTablesOcc += 1;
            response[reservation.table[this.options.reportColumn]].nbTablesDispo -= 1;
            response[reservation.table[this.options.reportColumn]].nbPersOcc += reservation.nbPerson;
            response[reservation.table[this.options.reportColumn]].nbPersDispo -= reservation.nbPerson;
            response[reservation.table[this.options.reportColumn]].percTablesOcc = Number(Number(response[reservation.table[this.options.reportColumn]].nbTablesOcc * 100 / response.nbTables[reservation.table[this.options.reportColumn]]).toFixed(2));
            response[reservation.table[this.options.reportColumn]].percTablesDispo = 100 - response[reservation.table[this.options.reportColumn]].percTablesOcc;
            response[reservation.table[this.options.reportColumn]].percPersOcc = Number(Number(response[reservation.table[this.options.reportColumn]].nbPersOcc * 100 / response.nbPers[reservation.table[this.options.reportColumn]]).toFixed(2));
            response[reservation.table[this.options.reportColumn]].percPersDispo = Number(100 - response[reservation.table[this.options.reportColumn]].percPersOcc);
            let eventDuration = 0;
            if (typeof reservation.begin === "string") {
                eventDuration = minutesDiff(new Date(reservation.begin + ' ' + reservation.beginHour), new Date(reservation.end + ' ' + reservation.endHour));
            } else {
                eventDuration = minutesDiff(reservation.begin, reservation.end);
            }
            const nbStep = eventDuration / this.options.step;
            for (let i = 0; i < nbStep; i++) {
                const hour = addMinutes(reservation.beginHour, this.options.step * i);
                if (response[reservation.table[this.options.reportColumn]].data[hour] == undefined) {
                    response[reservation.table[this.options.reportColumn]].data[hour] = {
                        nbTablesDispo: reservation.table.nbPlace,
                        nbPersDispo: response.nbPers[reservation.table[this.options.reportColumn]],
                        nbTablesOcc: 0,
                        nbPersOcc: 0,
                        percTablesDispo: 100,
                        percPersDispo: 100,
                        percTablesOcc: 0,
                        percPersOcc: 0,
                        color: '#FFFFFF',
                    }
                }

                response[reservation.table[this.options.reportColumn]].data[hour].nbTablesDispo -= 1;
                response[reservation.table[this.options.reportColumn]].data[hour].nbPersDispo -= reservation.nbPerson;
                response[reservation.table[this.options.reportColumn]].data[hour].nbTablesOcc += 1;
                response[reservation.table[this.options.reportColumn]].data[hour].nbPersOcc += reservation.nbPerson;
                response[reservation.table[this.options.reportColumn]].data[hour].percTablesOcc = Number(Number(response[reservation.table[this.options.reportColumn]].data[hour].nbTablesOcc * 100 / response.nbTables[reservation.table[this.options.reportColumn]]).toFixed(2));
                response[reservation.table[this.options.reportColumn]].data[hour].percTablesDispo = 100 - response[reservation.table[this.options.reportColumn]].data[hour].percTablesOcc;
                response[reservation.table[this.options.reportColumn]].data[hour].percPersOcc = Number(Number(response[reservation.table[this.options.reportColumn]].data[hour].nbPersOcc * 100 / response.nbPers[reservation.table[this.options.reportColumn]]).toFixed(2));
                response[reservation.table[this.options.reportColumn]].data[hour].percPersDispo = Number(100 - response[reservation.table[this.options.reportColumn]].data[hour].percPersOcc);
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
        return response;
    }


}
