import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {
    AlertController,
    IonBadge,
    IonButton,
    IonCol,
    IonDatetime,
    IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonModal,
    IonRippleEffect,
    IonRow,
    IonSelect,
    IonSelectOption,
    ToastController
} from "@ionic/angular/standalone";
import {TimelineOptionInterface} from "../../interfaces/timelineOption.interface";
import {CommonModule, DatePipe, formatDate} from "@angular/common";
import {addIcons} from "ionicons";
import {
    addCircleOutline,
    alarmOutline,
    arrowDown,
    arrowUp,
    calendarOutline,
    caretBackOutline,
    caretForwardOutline,
    checkmarkCircle,
    checkmarkCircleOutline,
    closeCircle,
    closeCircleOutline,
    colorWand,
    eyeOutline,
    informationCircleOutline,
    personOutline,
    removeCircleOutline
} from "ionicons/icons";
import {
    addMinutes,
    calculateNewWidth,
    getRankConteneurList,
    minutesDiff,
    STATUT_RESA_INIT,
    traitReservationText
} from "../../utils/generic.utils";
import {CdkDragDrop, DragDropModule} from "@angular/cdk/drag-drop";
import {ContextMenuModule} from "@perfectmemory/ngx-contextmenu";
import {KesyTimelineEventComponent} from "./reservation/event.component";
import {KesyTimelineCreneauComponent} from "./creneau/creneau.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ReportPaneComponent} from "../report-pane/report-pane.component";
import {LoadingController, ModalController} from "@ionic/angular";
import {EvenementComponent} from "./forms/evenement/evenement.component";
import {EveComponent} from "./evenement/eve/eve.component";
import {WidgetWeatherComponent} from "./widget-weather/widget-weather.component";
import {AddReservationComponent} from "./forms/add-event.component";

@Component({
    selector: 'kesy-calendar-right-pane',
    templateUrl: './right-pane.component.html',
    standalone: true,
    imports: [CommonModule, IonBadge, IonGrid, IonCol, IonRow, IonItem, IonButton, IonSelect, IonSelectOption, IonModal, IonRippleEffect, IonIcon, IonDatetime, IonLabel, WidgetWeatherComponent,
        DragDropModule, ContextMenuModule, KesyTimelineEventComponent, KesyTimelineCreneauComponent, FormsModule, DatePipe, HttpClientModule, ReportPaneComponent, EveComponent],
    styleUrls: ['./right-pane.component.scss'],
})
export class RightPaneComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('mySelect', {static: false}) selectRef: IonSelect;
    @ViewChild('hourLines') hourLines!: ElementRef;
    @ViewChild('reservation1Line') reservation1Line!: ElementRef;
    @ViewChild('timelineDataContainer') timelineDataContainer!: ElementRef;
    @ViewChild('calendar') calendar!: ElementRef;
    @ViewChild('resizeColumn') resizeColumn!: ElementRef;
    @Output() dateChanged = new EventEmitter<{ date: Date }>();
    @Output() choixChanged = new EventEmitter<string>();
    tables = []

    @Input() set all_tables(t) {
        this.tables = t;

        this.resizeHeight();
    }

    @Input() stocks = [];
    @Input() employersSPA = [];
    @Input() flags = [];
    @Input() reportTables = [];
    @Input() currencies = [];
    @Input() yearEvenements = [];
    @Input() clients = [];
    @Input() reservationBgColors: Map<string, string> = new Map();
    @Input() options: TimelineOptionInterface = {
        rank: "Hotel",
        beginHour: "09:00",
        endHour: "21:00",
        step: 15,
        reportColumn: 'type'
    };
    @Output() reservationCreated = new EventEmitter<{ reservation: any; trait: boolean }>();
    @Output() reservationUpdated = new EventEmitter<{ reservation: any; trait: boolean }>();
    @Output() reservationDeleted = new EventEmitter<{ reservation: any; table: any }>();

    @Output() evenementCreated = new EventEmitter<any>();
    columnsShowing: any = {};
    oneLeftColumnWidth: number = 75;
    leftColumnWidth: number = 0;
    @Input() choix: any[] = getRankConteneurList('restaurant');
    @Input() choixActuel: string = 'Hotel';
    curDate: Date = new Date();
    curDateText: string = (new Date()).toLocaleDateString();
    leftDataColumns = [];
    showAnnee: boolean = true;
    showMois: boolean = true;
    showSemaine: boolean = true;
    showJour: boolean = true;
    showEvenements: boolean = true;
    columnWidth: Number = 50;
    personBase64: string = 'data:image/png;base64,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'

    vue: 'jour' | 'semaine' | 'mois' | 'trimestre' | 'semestre' | 'annuel' = 'jour';
    hours: any[] = [];
    hoursDay: any[] = [];
    all_reservations = [];
    fileteredReservations = [];
    dateBegin: Date;
    dateEnd: Date;
    selectedHour: string;
    colors = [
        'success',
        'secondary',
        'tertiary',
        'warning',
        'medium'
    ];
    choixIndex = 0;

    @Input() set allReservations(reservations) {
        this.all_reservations = reservations;
        this._filterReservations(this.all_reservations);
    }

    colorEvenement: any[] = [];
    hourEvents = [];
    allEvents: any[] = [];

    @Input() set evenements(e) {
        if (e !== undefined) {
            this.allEvents = e;
            e.forEach((event, key) => {
                const index = this.hourEvents.findIndex(k => k.hour == event.heureDebut);
                if (index == -1) {
                    this.hourEvents.push({hour: event.heureDebut, event});
                } else {
                    this.hourEvents[index].event = event;
                }
            });
        }
    }

    loaded: boolean = false;
    choixLoaded: boolean = false;

    @Input() set loading(l) {
        this.loaded = l;
        if (l) {
            this._filterReservations(this.all_reservations);
            this.choix = this.options.rank == 'Hotel' ? this.options.rankHotelData : this.options.rankRestaurantData;
            if (!this.choixLoaded) {
                if (this.options.rank == 'Hotel') {
                    this.choixActuel = this.options.rankHotelData[0].key;
                } else {
                    this.choixActuel = this.options.rankRestaurantData[0].key;
                }
                this.choixChanged.emit(this.choixActuel);
                this.choixIndex = this.choix.findIndex(c => c.key == this.choixActuel);
                if (this.columnsShowing[this.choixActuel] == undefined) {
                    this.columnsShowing[this.choixActuel] = [];
                    this.options[this.choixActuel].forEach((col, k) => {
                        this.columnsShowing[this.choixActuel][k] = true;
                    });
                }
                this.oneLeftColumnWidth = this.options.leftColumnWidth
                this.leftColumnWidth = this.oneLeftColumnWidth * this.columnsShowing[this.choixActuel].filter(Boolean).length;
                this.choixLoaded = true
            }
            this.getData();
        }
    }

    sysDate: Date = new Date();
    private timerId: any;

    constructor(private cdr: ChangeDetectorRef, private toastController: ToastController, private modalController: ModalController, private alertController: AlertController, private loadingController: LoadingController) {
        addIcons({
            caretBackOutline,
            caretForwardOutline,
            calendarOutline,
            removeCircleOutline,
            addCircleOutline,
            closeCircleOutline,
            checkmarkCircleOutline,
            alarmOutline,
            personOutline, eyeOutline,
            colorWand, arrowDown, arrowUp,
            checkmarkCircle, closeCircle
        });
    }

    loadingInstance;

    async showLoading() {
        this.loadingInstance = await this.loadingController.create({
            message: 'Chargement en cours ...',
            spinner: 'bubbles',
            duration: 2000
        });

        this.loadingInstance.present();
    }

    async hideLoading() {
        if (this.loadingInstance) {
            try {
                await this.loadingInstance.dismiss();
                this.loadingInstance = undefined;
            } catch (e) {
                console.log('Loader already dismissed:', e);
            }
        }
    }

    _filterReservations(reservations) {
        this.fileteredReservations = reservations;
        // this.cdr.detectChanges();
    }

    ngOnInit() {
        this.showLoading();
    }

    ngOnDestroy() {
        // Nettoyer l'intervalle pour éviter les fuites de mémoire
        if (this.timerId) {
            clearInterval(this.timerId);
        }

    }

    ngAfterViewInit() {
        let steps = 0;
        setTimeout(() => {
            let diffMin = minutesDiff(this.sysDate, (new Date(this.sysDate.toISOString().split('T')[0] + ' ' + this.options.beginHour)));
            steps = Math.round(diffMin / Number(this.options.step)) - 2;
            if (steps > 36) {
                steps = 36;
            }
            this.scrollLeft = (steps * Number(this.columnWidth)) - 80;
            this.timelineDataContainer.nativeElement.scrollTo({
                left: this.scrollLeft,
                behavior: 'instant',
            });
            this.hourLines.nativeElement.scrollTo({
                left: this.scrollLeft,
                behavior: 'instant',
            });
            this.reservation1Line.nativeElement.scrollTo({
                left: this.scrollLeft,
                behavior: 'instant',
            });
        }, 1000);

    }

    showHideColumn(id) {
        this.columnsShowing[this.choixActuel][id] = !this.columnsShowing[this.choixActuel][id];
        this.oneLeftColumnWidth = this.options.leftColumnWidth
        this.leftColumnWidth = this.columnsShowing[this.choixActuel].filter(Boolean).length * this.oneLeftColumnWidth;
    }

    async getData() {
        this.hours = [];
        this.hoursDay = [];
        this.oneLeftColumnWidth = this.options.leftColumnWidth;
        if (this.columnsShowing[this.choixActuel] == undefined) {
            this.columnsShowing[this.choixActuel] = [];
            this.options[this.choixActuel].forEach((col, k) => {
                this.columnsShowing[this.choixActuel][k] = true;
            });
        }
        this.leftColumnWidth = this.oneLeftColumnWidth * this.columnsShowing[this.choixActuel].filter(Boolean).length;
        let diffMin = minutesDiff(this.sysDate, (new Date(this.sysDate.toISOString().split('T')[0] + ' ' + this.options.beginHour)));
        let steps = Math.round(diffMin / Number(this.options.step)) - 2;
        this.choix = this.options.rank == 'Hotel' ? this.options.rankHotelData : this.options.rankRestaurantData;
        //this.tables = [...this.tables];
        this.columnWidth = this.options.columnWidth | 50;
        this.resizeHeight();
        this.curDateText = this.curDate.toLocaleDateString();

        const beginParts = this.options.beginHour.match(/(\d+)\:(\d+)/);
        const endParts = this.options.endHour.match(/(\d+)\:(\d+)/);

        this.dateBegin = new Date();
        this.dateBegin.setHours(Number(beginParts[1]), Number(beginParts[2]), 0);
        this.dateEnd = new Date();
        this.dateEnd.setHours(Number(endParts[1]), Number(endParts[2]), 0);
        let beginBoucleTime = this.dateBegin.getTime()
        let endBoucleTime = this.dateEnd.getTime()
        while (beginBoucleTime <= endBoucleTime) {
            this.hours.push((this.dateBegin.getHours() < 10 ? '0' : '') + this.dateBegin.getHours() + ':' + (this.dateBegin.getMinutes() < 10 ? '0' : '') + this.dateBegin.getMinutes());
            const dayOfWeek = this.dateBegin.getDay();
            this.hoursDay.push((dayOfWeek === 6) || (dayOfWeek === 0));
            beginBoucleTime += Number(this.options.step) * 60000;
            this.dateBegin.setTime(beginBoucleTime);
        }
        this.timerId = setInterval(() => {
            this.sysDate = new Date();
        }, 1000);
        let calendarWidth = (this.calendar.nativeElement as HTMLElement).offsetWidth;
        calendarWidth = calendarWidth - (calendarWidth * 20 / 100);
        /*this.columnWidth = ((calendarWidth - 20) / this.hours.length);
        if (Number(this.columnWidth) < 60) {
            this.columnWidth = 60
        }*/
        this.options.columnWidth = Number(this.columnWidth);
        //this.hourLines.nativeElement.style.width = calendarWidth +'px';
        //console.log(calendarWidth);

        diffMin = minutesDiff(this.sysDate, (new Date(this.sysDate.toISOString().split('T')[0] + ' ' + this.options.beginHour)));
        steps = Math.round(diffMin / Number(this.options.step)) - 2;
        this.scrollLeft = steps * Number(this.columnWidth);
        this.timelineDataContainer.nativeElement.scrollTo({
            left: this.scrollLeft,
            behavior: 'instant',
        });
        this.hourLines.nativeElement.scrollTo({
            left: this.timelineDataContainer.nativeElement.scrollLeft,
            behavior: 'instant',
        });
        this.reservation1Line.nativeElement.scrollTo({
            left: this.timelineDataContainer.nativeElement.scrollLeft,
            behavior: 'instant',
        });
        setTimeout(() => {
            this.scrollLeft--;
        }, 100);
        await this.hideLoading();
    }


    openSelect() {
        this.selectRef.open()
    }

    scrollLeft;

    onScrollTimeline(reservation: any) {
        this.scrollLeft = this.timelineDataContainer.nativeElement.scrollLeft;
        this.hourLines.nativeElement.scrollTo({
            left: this.timelineDataContainer.nativeElement.scrollLeft,
            behavior: 'instant',
        });
        this.reservation1Line.nativeElement.scrollTo({
            left: this.timelineDataContainer.nativeElement.scrollLeft,
            behavior: 'instant',
        });
    }

    decColumnSize() {
        this.columnWidth = Number(this.columnWidth) - Number(10);
    }

    resize($event) {
        this.columnWidth += $event.distance.x;
        this.options.columnWidth += $event.distance.x;
        this.all_reservations.forEach((e, k) => {
            this.all_reservations[k] = calculateNewWidth(e, this.columnWidth, this.options.step);
        });
    }

    decDate() {
        this.showLoading();
        this.loaded = false;
        const newDate = new Date(this.curDate.getTime());
        newDate.setTime(this.curDate.getTime() - (1 * 24 * 60 * 60 * 1000));
        this.curDate = new Date(newDate.getTime());
        this.curDateText = this.curDate.toLocaleDateString();
        this.dateChanged.emit({date: this.curDate});
        this._filterReservations(this.all_reservations);
    }

    incDate() {
        this.showLoading();
        this.loaded = false;
        const newDate = new Date(this.curDate.getTime());
        newDate.setTime(this.curDate.getTime() + (1 * 24 * 60 * 60 * 1000));
        this.curDate = new Date(newDate.getTime());
        this.curDateText = this.curDate.toLocaleDateString();
        this.dateChanged.emit({date: this.curDate});
        this._filterReservations(this.all_reservations);
    }

    incColumnSize() {
        this.columnWidth = Number(this.columnWidth) + Number(10);
    }

    drop($event: CdkDragDrop<number>) {
        const $this = this;
        const message = 'Attention, vous êtes sur le point de <strong class="error">déplacer cette réservation !</strong>'
        this.confirmAction('Déplacement de réservation', message, () => {
            let oldTable = {}
            let reservation: any = $event.container.data;
            const isDnd = $event.item.element.nativeElement.classList.contains('cal-draggable');
            const distanceX = $event.distance.x;
            const distanceY = $event.distance.y;
            const timeToadd = Math.round(($this.options.step * (distanceX / Number($this.columnWidth))) / $this.options.step) * $this.options.step;

            if (typeof reservation.begin != 'string') {
                reservation.begin = reservation.begin.toISOString().split('T')[0]
                reservation.end = reservation.end.toISOString().split('T')[0]
            }
            const tableIndexToAdd = Math.round((distanceY) / Number($this.options.columnHeight));
            const BreakException = {};
            if (isDnd) {
                reservation.topPos = Math.round((reservation.topPos + distanceY) / Number($this.options.columnHeight)) * Number($this.options.columnHeight);
                reservation.beginHour = addMinutes(reservation.beginHour, timeToadd);
                reservation.endHour = addMinutes(reservation.endHour, timeToadd);
                try {
                    $this.tables.forEach((table, key) => {
                        if (table.id === reservation.table.id) {
                            const newKey = key + tableIndexToAdd;
                            reservation.table = {...$this.tables[newKey]};
                            oldTable = Object.assign({}, table);
                            reservation.tableId = $this.tables[newKey].id;
                            reservation.topPos = $this.options.columnHeight * newKey;
                            reservation = traitReservationText(reservation);
                            throw BreakException;
                        }
                    });
                } catch (e) {
                    if (e !== BreakException) throw e;
                }
                $this.reservationUpdated.emit({reservation, trait: false});
            } else {
                reservation = calculateNewWidth(reservation, $this.options.columnWidth, $this.options.step);
            }
        });

    }

    datePick($event) {
        this.curDate = new Date($event.detail.value);
        this.curDateText = this.curDate.toLocaleDateString();
        this._filterReservations(this.all_reservations);
        this.dateChanged.emit({date: this.curDate});
    }

    createReservation(e) {
        this.reservationCreated.emit(e);
    }

    updateReservation(e) {
        this.reservationUpdated.emit(e);
    }

    deleteReservation(e) {
        this.reservationDeleted.emit(e);
    }

    resizeHeight() {
        this.options.columnHeight = this.tables.length < 21 ? 548 / this.tables.length : this.options.columnHeight;
        if (this.options.columnHeight > 53) {
            this.options.columnHeight = 53;
        }
    }

    changerChoix($event) {
        this.showLoading();
        this.choixChanged.emit($event.detail.value);
        this.choixIndex = this.choix.findIndex(c => c.key == $event.detail.value);
        if (this.columnsShowing[this.choixActuel] == undefined) {
            this.columnsShowing[this.choixActuel] = [];
            this.options[this.choixActuel].forEach((col, k) => {
                this.columnsShowing[this.choixActuel][k] = true;
            });
        }
        this.oneLeftColumnWidth = this.options.leftColumnWidth
        this.leftColumnWidth = this.oneLeftColumnWidth * this.columnsShowing[this.choixActuel].filter(Boolean).length;
    }

    async ouvrirModalEvenement() {
        const modal = await this.modalController.create({
            component: EvenementComponent,
            componentProps: {
                formData: {
                    debut: this.curDate.toISOString().split('T')[0],
                    fin: this.curDate.toISOString().split('T')[0],
                    couleur: '#ffffff',
                    couleurTexte: '#000000'
                },
                yearEvenements: this.yearEvenements
            }
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data.data) {
                    this.evenementCreated.emit(data);

                }
            })
        return await modal.present();
    }

    sortDirection = 'ASC';
    sortColumn = 'ASC';
    sortDirections = ['ASC', 'DESC'];
    recalculateTopPos: boolean = false;

    sortTables(columnName) {
        let columnsIndex = this.options[this.choixActuel].findIndex(c => c.column == columnName);
        if (this.sortColumn != columnName) {
            this.sortDirection = 'ASC';
        } else {
            let indexDirection = this.sortDirections.findIndex(e => e == this.sortDirection);
            columnsIndex = this.options[this.choixActuel].findIndex(c => c.column == columnName);
            indexDirection += 1;
            if (indexDirection >= this.sortDirections.length) {
                indexDirection = 0;
            }
            this.sortDirection = this.sortDirections[indexDirection];
        }
        if (this.sortDirection == 'DESC') {
            this.tables = [...this.tables.sort((a, b) => b[this.options[this.choixActuel][columnsIndex].columnData].localeCompare(a[this.options[this.choixActuel][columnsIndex].columnData]))];
        } else {
            this.tables = [...this.tables.sort((a, b) => a[this.options[this.choixActuel][columnsIndex].columnData].localeCompare(b[this.options[this.choixActuel][columnsIndex].columnData]))];
        }
        this.sortColumn = columnName;
        this.recalculateTopPos = true;
    }

    async confirmAction(header = 'Attention !!', message = 'Vous êtes sur le point d\'effectuer une action irreversible', action = function () {
    }) {
        const alert = await this.alertController.create({
            header,
            message: '<div class="ion-text-center">' + message + '</div>',
            mode: 'md',
            animated: true,
            backdropDismiss: true,
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    id: 'cancel-button',
                    handler: (blah) => {
                    }
                }, {
                    text: 'OUI, Je confirme',
                    id: 'confirm-button',
                    handler: () => {
                        action()
                    }
                }
            ]
        });

        await alert.present();
    }

    curEvent;
    showContextMenu = true;
    async addEvent(hour, table) {
        const date1 = formatDate(this.curDate, 'yyyy-MM-dd', 'en_US');
        const today = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
        const explodedHour = hour.split(':')
        if (date1 >= today) {
            this.curEvent = {
                id: 0,
                begin: date1,
                beginHour: hour,
                end: date1,
                endHour: (Number(explodedHour[0]) + 1) + ':' + explodedHour[1],
                text: 'Nouveau',
                table: table,
                tableId: table.id,
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

    async openFormreservationModal() {
        const reservationModal = await this.modalController.create({
            component: AddReservationComponent,
            componentProps: {
                formData: this.curEvent,
                tables: this.tables,
                clients: this.clients,
                timelineWidth: this.options.columnWidth,
                timelineHeight: this.options.columnHeight,
                step: this.options.step,
                options: this.options,
                flags: this.flags,
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
