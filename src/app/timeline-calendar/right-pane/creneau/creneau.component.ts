import {Component, Input, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';

import {ContextMenuModule} from "@perfectmemory/ngx-contextmenu";
import {ModalController} from "@ionic/angular";
import {IonIcon, IonItem, IonLabel, ToastController} from "@ionic/angular/standalone";
import {AddReservationComponent} from "../forms/add-event.component";
import {KesyReservationInterface} from "../../../interfaces/KesyReservation.interface";
import {CommonModule, formatDate} from "@angular/common";
import {addIcons} from "ionicons";
import {addCircleOutline, informationCircleOutline} from "ionicons/icons";
import {OverlayModule, OverlayRef} from "@angular/cdk/overlay";
import {STATUT_RESA_INIT} from "../../../utils/generic.utils";
import {EvenementComponent} from "../forms/evenement/evenement.component";


@Component({
    selector: 'kesy-timeline-creneau',
    templateUrl: './creneau.component.html',
    styleUrls: ['./creneau.component.scss'],
    standalone: true,
    imports: [CommonModule, OverlayModule, ContextMenuModule, IonItem, IonLabel, IonIcon],
    providers: [ModalController, ToastController]
})
export class KesyTimelineCreneauComponent implements OnInit {
    @Input() timelineWidth: number = 80;
    @Input() timelineHeight: number = 80;
    @Input() step: number = 15;
    @Input() table: any;
    @Input() tables: any = [];
    @Input() clients: any = [];
    @Input() employersSPA: any = [];
    @Input() hour: any;
    @Input() options: any;
    @Input() date: Date;

    explodedHour;
    private overlayRef: OverlayRef | null = null;
    curEvent: KesyReservationInterface = null;

  @Output() reservationCreated = new EventEmitter<{ reservation: any, trait: boolean }>();
  @Output() evenementCreated = new EventEmitter<{ evenement: any }>();
  showContextMenu = true;

    constructor(
        private modalController: ModalController, private toastController: ToastController
    ) {
        addIcons({informationCircleOutline, addCircleOutline});
    }

    ngOnInit() {
        this.explodedHour = this.hour.split(':');
    }


    async addEvent(data) {
        const date1 = formatDate(this.date, 'yyyy-MM-dd', 'en_US');
        const today = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
        if (date1 >= today) {
            this.curEvent = {
                id: 0,
                begin: this.date,
                beginHour: this.hour,
                end: this.date,
                endHour: (Number(this.explodedHour[0]) + 1) + ':' + this.explodedHour[1],
                text: 'Nouveau',
                table: this.table,
                tableId: this.table.id,
                actif: true,
                nbPerson: 1,
                status: STATUT_RESA_INIT,
            };
            this.openFormreservationModal();
        } else {
            const toast = await this.toastController.create({
                message: 'Erreur : Vous ne pouvez pas créer une réservation à cette date!',
                duration: 1500,
                position: 'top',
                icon: informationCircleOutline,
                color: 'danger'
            });

            await toast.present();
        }

    }


    @Input() choixActuel = 'Restaurant';
    @Input() personBase64;

    async openFormreservationModal() {
        const reservationModal = await this.modalController.create({
            component: AddReservationComponent,
            componentProps: {
                formData: this.curEvent,
                tables: this.tables,
                clients: this.clients,
                timelineWidth: this.timelineWidth,
                timelineHeight: this.timelineHeight,
                step: this.step,
                options:this.options,
                choixActuel: this.choixActuel,
                employers: this.employersSPA,
                personBase64: this.personBase64,
            }
        });
        reservationModal.onDidDismiss().then((data) => {
            if (data !== null && data.data) {
                data.data.tableId = data.data.table.id;
                this.reservationCreated.emit({reservation: data.data, trait: true});
            }
        });
        return await reservationModal.present();
    }
}
