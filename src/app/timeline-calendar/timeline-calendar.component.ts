import {Component, EventEmitter, Input, LOCALE_ID, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CommonModule, registerLocaleData} from "@angular/common";
import {IonContent} from "@ionic/angular/standalone";
import {KesyKelyHeaderComponent} from "../generic/header/header.component";
import {TimelineOptionInterface} from "../interfaces/timelineOption.interface";
import localeFr from '@angular/common/locales/fr';
import {LeftPaneComponent} from "./left-pane/left-pane.component";
import {RightPaneComponent} from "./right-pane/right-pane.component";
import {getRankConteneurList} from "../utils/generic.utils";

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'kesy-timeline-calendar',
    templateUrl: './timeline-calendar.component.html',
    styleUrls: ['./timeline-calendar.component.scss'],
    imports: [CommonModule, KesyKelyHeaderComponent,
        IonContent,

        LeftPaneComponent, RightPaneComponent
    ],


    providers: [{provide: LOCALE_ID, useValue: 'fr'}],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
})

export class TimelineCalendarComponent implements OnInit {

    @Input() draggedEvent = null;
    @Input() currencies = [];
    @Input() employersSPA = [];
    @Input() flags = [];
    @Input() stocks = [];
    choix: any[] = getRankConteneurList('restaurant');
    @Input() choixActuel: string = 'Restaurant';
    loaded: boolean = false;
    choixLoaded = false;

    @Input() set loading(l) {
        this.loaded = l;
        if (l && !this.choixLoaded) {
            if (this.options.rank == 'Hotel') {
                this.choixActuel = this.options.rankHotelData[0].key;
            } else {
                this.choixActuel = this.options.rankRestaurantData[0].key;
            }
            this.choixLoaded = true
        }
    }

    @Input() reservationBgColors: Map<string, string> = new Map();
    @Input() countEventsForAllForms;
    @Input() options: TimelineOptionInterface = {
        rank: "Hotel",
        beginHour: "09:00",
        endHour: "21:00",
        step: 15,
        reportColumn: 'type'
    };

    @Input() set currentChoix(c) {
        this.options = c;
        this.choix = getRankConteneurList(this.options.rank);
    }

    @Output() reservationCreated = new EventEmitter<{ reservation: any; trait: boolean }>();
    @Output() reservationUpdated = new EventEmitter<{ reservation: any; trait: boolean }>();
    @Output() reservationDeleted = new EventEmitter<{ reservation: any; table: any }>();

    @Output() dateChanged = new EventEmitter<{ date: Date }>();
    @Output() timelineEventCreated = new EventEmitter<any>();
    @Output() choixChanged = new EventEmitter<string>();
    all_reservations = [];
    all_evenements = [];
    @Input() yearEvenements = [];

    @Input() set reservations(reservations) {
        this.all_reservations = reservations;
    }

    @Input() set evenements(evenements) {
        this.all_evenements = evenements;
        this.yearEvenements = this.yearEvenements.filter(e => e.id == e.id);

    }

    allTables: any[];

    @Input() set tables(t) {
        this.allTables = t;
    };

    @Input() clients = [];
    @Input() reportTables = [];
    bgColors: string[] = [];


    constructor() {
        for (let i = 0; i < 16; i++)
            this.bgColors.push((Math.floor(Math.random() * 0xFFFFFF)).toString(16));
    }


    ngOnInit() {
        this.reportTables = [];
    }

    changeChoix($choix) {
        this.choixActuel = $choix;
        this.choixChanged.emit(this.choixActuel);
    }

    onEventCreated(eventData) {
        this.timelineEventCreated.emit(eventData);
    }

}
