import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    IonBadge,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader
} from "@ionic/angular/standalone";
import {ContextMenuModule} from "@perfectmemory/ngx-contextmenu";
import {TimelineOptionInterface} from "../../interfaces/timelineOption.interface";
import {KesyLeftPaneItemComponent} from "./item/item.component";
import {addIcons} from "ionicons";
import {checkmarkOutline, closeOutline} from "ionicons/icons";
import {getRankConteneurList, stringToDate} from "../../utils/generic.utils";

@Component({
    selector: 'kesy-calendar-left-pane',
    templateUrl: './left-pane.component.html',
    standalone: true,
    imports: [CommonModule, IonList, IonItem, IonLabel, IonListHeader, ContextMenuModule, KesyLeftPaneItemComponent, IonBadge, IonButtons, IonButton, IonIcon],
    styleUrls: ['./left-pane.component.scss'],
})
export class LeftPaneComponent implements OnInit {
    reservations: any[] = [];
    personBase64: string = 'data:image/png;base64,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'
    @Input() options: TimelineOptionInterface = {
        rank: "Hotel",
        beginHour: "09:00",
        endHour: "21:00",
        step: 15,
        reportColumn: 'type'
    };

    @Input() set allReservations(reservations) {
        this.reservations = reservations;
        this._getLeftColumnData();
    }

    showStayOver = true;
    showCheckIn = true;
    showCheckOut = true;
    choixActuel = 'Restaurant';

    @Input({required: true}) set choix(c) {
        this.choixActuel = c;
        this._getLeftColumnData();
    }

    loaded: boolean = false;

    @Input() set loading(l) {
        this.loaded = l;
        this._getLeftColumnData();
    }

    constructor() {
        addIcons({checkmarkOutline, closeOutline});
    }

    ngOnInit() {
        this._getLeftColumnData();
    }

    presents = [];
    departs = [];
    arrivees = [];
    presentsPersons = 0;
    departsPersons = 0;
    arriveesPersons = 0;

    _getLeftColumnData() {
        setTimeout(() => {
            let data = [];
            this.presents = [];
            this.arrivees = [];
            this.departs = [];
            this.presentsPersons = 0;
            this.departsPersons = 0;
            this.arriveesPersons = 0;
            if (this.reservations.length > 0) {
                const $this = this;
                this.departs = this.reservations.filter(function (reservation) {
                    return reservation.status == 2;
                });
                this.arrivees = this.reservations.filter(function (reservation) {
                    return reservation.status == 1;
                });
                this.presents = this.reservations.filter(function (reservation) {
                    return reservation.status == 0;
                });
                //console.log({d: this.departs})
            }
            for(let present of this.presents){
                this.presentsPersons += present.nbPerson;
            }
            for(let depart of this.departs){
                this.departsPersons += depart.nbPerson;
            }
            for(let arrivee of this.arrivees){
                this.arriveesPersons += arrivee.nbPerson;
            }
        }, 100);
    }


}
