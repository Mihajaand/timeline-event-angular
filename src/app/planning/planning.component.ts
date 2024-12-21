import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonContent, ToastController} from "@ionic/angular/standalone";
import {TablesService} from "../services/tables.service";
import {TimelineCalendarComponent} from "../timeline-calendar/timeline-calendar.component";
import {KesyKelyHeaderComponent} from "../generic/header/header.component";
import {ApiService} from "../services/api.services";
import {informationCircleOutline} from "ionicons/icons";
import {TimelineOptionInterface} from "../interfaces/timelineOption.interface";
import {STATUT_RESA_INIT} from "../utils/generic.utils";
import {addIcons} from "ionicons";

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styleUrls: ['./planning.component.scss'],
    imports: [CommonModule, IonContent, TimelineCalendarComponent, KesyKelyHeaderComponent],
    providers: [TablesService, ToastController],
    standalone: true
})
export class PlanningComponent implements OnInit {
    options: TimelineOptionInterface = {
        rank: "Hotel",
        beginHour: "09:00",
        endHour: "21:00",
        step: 15,
        reportColumn: 'type'
    };
    curDate: Date = new Date();
    tomorrow: Date = new Date();
    reservations = [];
    employersSPA = [];
    isReservationsLoaded: boolean = false;


    constructor(private db: ApiService, private toastController: ToastController, private cdr: ChangeDetectorRef) {
        addIcons({informationCircleOutline});
    }

    allTables = [];
    allReservations = [];
    errorMessage;

    flags = [];

    getReservations(init = false, action = '', reservation = null) {
        let _this = this;
        if (init) {
            _this.allTables = [];
            _this.flags = [];
            _this.allReservations = [];
            _this.reservations = [];
            _this.allClients = [];
            _this.allServices = [];
            _this.reportTables = [];
            _this.stocks = [];
            _this.configurations = [];
            _this.currencies = [];
            _this.events = [];
            _this.allEvents = [];
            _this.employersSPA = [];
            _this.isReservationsLoaded = false;
            _this.db.getList('orchestrator', [
                {key: 'begin', value: _this.curDate.toISOString().split('T')[0]},
                {key: 'end', value: _this.curDate.toISOString().split('T')[0]},
                {key: 'actif', value: 1},
                {key: 'conteneur', value: _this.currentChoix}
            ]).subscribe({
                next: (result) => {
                    _this.allReservations = result.reservations;
                    if (_this.allReservations.length > 0) {
                        for (let reservation of _this.allReservations) {
                            if (reservation !== null) {
                                reservation.time = new Date();
                                if (reservation.actif)
                                    _this.reservations.push(reservation);
                            }
                        }
                    }
                    _this.employersSPA = result.employers;
                    _this.flags = result.flags;
                    _this.allTables = result.conteneurs;
                    _this.reportTables = result.reportData;
                    _this.allClients = result.clients;
                    _this.allServices = result.services;
                    _this.stocks = result.stocks;
                    _this.configurations = result.configurations;
                    const index = _this.configurations.findIndex(c => c.name == 'currencies');
                    let currentConfig;
                    if (index > -1) {
                        currentConfig = _this.configurations[index];
                    }
                    const ix = _this.configurations.findIndex(c => c.name == 'parametres');
                    if (index > -1) {
                        _this.options = _this.configurations[ix].value;
                        if (this.options.rank == 'Hotel') {
                            this.currentChoix = this.options.rankHotelData[0].key;
                        } else {
                            this.currentChoix = this.options.rankRestaurantData[0].key;
                        }
                    }

                    currentConfig.value.forEach((v, k) => {
                        result.currencyRates.forEach((c: any, d) => {
                            if (v.code == c.curencyCode) {
                                _this.currencies.push(c);
                            }
                        });
                    });
                    _this.allEvents = result.evenements;
                    _this.events = result.yearEvenements;
                    _this.isReservationsLoaded = true;
                    this.cdr.detectChanges();
                },
                error: (error) => {
                    _this.errorMessage = error;
                    console.error('Une erreur est survenue lors de la requête !', error);
                }
            });
        } else {
            reservation.time = new Date();
            switch (action) {
                case 'create':
                    this.reservations.push(reservation);
                    break;
                case 'update':
                    let index = _this.reservations.findIndex(e => e.id === reservation.id);
                    if (index !== -1) {
                        if (this.reservations[index].actif == false) {
                            _this.reservations.splice(index, 1);
                        } else {
                            _this.reservations[index] = reservation;
                        }
                    }
                    break;
                case 'delete':
                    let ix = _this.reservations.findIndex(e => e.id === reservation.id);
                    if (ix !== -1) {
                        _this.reservations.splice(ix, 1);
                    }
                    break;
            }
            this.cdr.detectChanges();
        }
    }

    async _showMessage(message, status = 'success') {
        const toast = await this.toastController.create({
            message,
            duration: 1000,
            position: 'top',
            icon: informationCircleOutline,
            color: status
        });
        await toast.present();
    }


    async getReservationsDate(e) {
        this.isReservationsLoaded = false;
        this.curDate = e.date;
        this.getReservations(true);
        //this.getAllEvents(this.curDate.toISOString().split('T')[0]);

    }


    allClients = [];
    allServices = [];
    allEvents = [];
    events = [];
    stocks = [];
    configurations = [];
    currencies = [];
    reportTables = [];
    reservationBgColors: Map<string, string> = new Map();

    ngOnInit() {
        this.reservationBgColors.set('presents', '#fabf8f');// en attente
        this.reservationBgColors.set('arrivees', '#92d050');//confirmé
        this.reservationBgColors.set('en_option', '#f8655a');//en option
        this.reservationBgColors.set('reservit', '#f8655a');//reservit
        this.reservationBgColors.set('paye', '#ac99c1');//payé
        this.reservationBgColors.set('departs', '#5f497a');//en débit
        this.reportTables = [];
        this.getReservations(true);
    }

    async getAllEvents(begin, end = '') {
        this.events = [];
        this.allEvents = [];
        this.isReservationsLoaded = false;
        await this.db.getList('evenement', [{key: 'debut', value: begin}, {key: 'fin', value: end}]).subscribe({
            next: async (evenements: any) => {
                this.allEvents = evenements;
                await this.db.getList('evenement', [{key: 'debut', value: this.curDate.getFullYear() + '-01-01'}, {
                    key: 'fin',
                    value: this.curDate.getFullYear() + '-12-31'
                }]).subscribe({
                    next: (evenements: any) => {
                        this.events = evenements;
                    },
                    error: (error) => {
                        console.error('Error of insert', error);
                    }
                });
                this.isReservationsLoaded = true;
            },
            error: (error) => {
                console.error('Error of insert', error);
            }
        });

        //console.log(this.allEvents);
    }

    createReservation($event) {
        this.isReservationsLoaded = false;
        if (typeof $event.reservation.begin != 'string') {
            $event.reservation.begin = $event.reservation.begin.toISOString().split('T')[0];
            $event.reservation.end = $event.reservation.end.toISOString().split('T')[0];
        }
        this.db.add('reservation', {
            begin: $event.reservation.begin.substring(0, 10),
            beginHour: $event.reservation.beginHour,
            end: $event.reservation.end.substring(0, 10),
            endHour: $event.reservation.endHour,
            leftPos: $event.reservation.leftPos,
            topPos: $event.reservation.topPos,
            reservationText: $event.reservation.reservationText,
            actif: true,
            status: STATUT_RESA_INIT,
            nbPerson: $event.reservation.nbPerson,
            width: $event.reservation.width.toString(),
            texte: $event.reservation.texte,
            tableId: $event.reservation.table.id,
            clientId: $event.reservation.client.id,
            employer1: $event.reservation.employer1 ? $event.reservation.employer1?.id : null,
            employer2: $event.reservation.employer2 ? $event.reservation.employer2?.id : null,
            commentaire: $event.reservation.commentaire || '',
        }).subscribe({
            next: (response: any) => {
                //console.log(response, 'create success');
                this._showMessage('Création éfféctuée avec succès !');
                if ($event.trait !== undefined && $event.trait) {
                    this.getReservations(false, 'create', response);
                }
                this.isReservationsLoaded = true;
                this.cdr.detectChanges();
            },
            error: (error) => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                this._showMessage('Création non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
            }
        });
    }

    onEventCreated(eventData) {
        this.isReservationsLoaded = false;
        const evenementCreatedData = {
            nom: eventData.data.nom,
            debut: new Date(eventData.data.debut + ' ' + eventData.data.heureDebut),
            fin: new Date(eventData.data.fin + ' ' + eventData.data.heureFin),
            heureDebut: eventData.data.heureDebut,
            heureFin: eventData.data.heureFin,
            couleur: eventData.data.couleur,
            couleurTexte: eventData.data.couleurTexte,
        };

        if (eventData.role == "create") {
            this.db.add('evenement', evenementCreatedData).subscribe({
                next: async (createdEvent: any) => {
                    console.log('évènement créé avec succès:', createdEvent);
                    await this.getAllEvents(this.curDate.toISOString().split('T')[0]);
                    this.isReservationsLoaded = true;
                },
                error: (err) => {
                    console.error('Erreur lors de la création de l\'évènement:', err);
                }
            });
        } else if (eventData.role == "edit") {
            this.db.edit('evenement', eventData.data.id, evenementCreatedData).subscribe({
                next: async (createdEvent) => {
                    console.log('évènement modifié avec succès:', createdEvent);
                    await this.getAllEvents(this.curDate.toISOString().split('T')[0]);
                    this.isReservationsLoaded = true;
                },
                error: (err) => {
                    console.error('Erreur lors de la modification de l\'évènement:', err);
                }
            });
        } else if (eventData.role == "delete") {
            this.db.delete('evenement', eventData.data.id).subscribe({
                next: async (response) => {
                    this._showMessage('Suppression effectuée avec succès !');
                    await this.getAllEvents(this.curDate.toISOString().split('T')[0]);
                    this.isReservationsLoaded = true;
                },
                error: (error) => {
                    console.error('Erreur lors de la suppression', error);
                    this._showMessage('Échec de la suppression.', 'danger');
                }
            });
        }
    }


    updateReservation($event) {
        this.isReservationsLoaded = false;
        if (typeof $event.reservation.begin != 'string') {
            $event.reservation.begin = $event.reservation.begin.toISOString().split('T')[0];
            $event.reservation.end = $event.reservation.end.toISOString().split('T')[0];
        }
        this.db.edit('reservation', $event.reservation.id, {
            begin: $event.reservation.begin.substring(0, 10),
            beginHour: $event.reservation.beginHour,
            end: $event.reservation.end.substring(0, 10),
            endHour: $event.reservation.endHour,
            leftPos: $event.reservation.leftPos,
            topPos: $event.reservation.topPos,
            reservationText: $event.reservation.reservationText,
            width: $event.reservation.width.toString(),
            texte: $event.reservation.texte,
            actif: $event.reservation.actif,
            nbPerson: $event.reservation.nbPerson,
            status: $event.reservation.status,
            tableId: $event.reservation.table.id,
            clientId: $event.reservation.client.id,
            employer1: $event.reservation.employer1 ? $event.reservation.employer1?.id : null,
            employer2: $event.reservation.employer2 ? $event.reservation.employer2?.id : null,
            commentaire: $event.reservation.commentaire || '',
        }).subscribe({
            next: (response) => {
                //console.log(response, 'update success');
                this._showMessage('Modification éfféctuée avec succès !');
                if ($event.trait)
                    this.getReservations(false, 'update', response);
                this.isReservationsLoaded = true;
            },
            error: (error) => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                this._showMessage('Modification non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
            }
        });
    }

    deleteReservation($event) {
        this.isReservationsLoaded = false;
        this.db.delete('reservation', $event.reservation.id).subscribe({
            next: (response) => {
                //console.log(response, 'delete success');
                this._showMessage('Suppression éfféctuée avec succès !');
                this.getReservations(false, 'delete', $event.reservation);
                this.isReservationsLoaded = true;
            },
            error: (error) => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                this._showMessage('Suppression non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
            }
        });
    }

    currentChoix = 'Hotel';

    async choixChanged(c) {
        this.currentChoix = c;
        /*if (c == 'SPA' || c == 'Lavage') {
            this.db.getList('employer').subscribe({
                next: async (employers: any) => {
                    this.employersSPA = employers;
                },
                error: (error) => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                }
            });
        } else {
            this.employersSPA = [];
        }*/
        this.getReservations(true);
    }

}
