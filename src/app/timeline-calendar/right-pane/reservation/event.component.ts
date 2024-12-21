import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
    ViewChild, Renderer2, ChangeDetectorRef
} from '@angular/core';
import {KesyReservationInterface} from "../../../interfaces/KesyReservation.interface";
import {CdkDrag, CdkDropList, DragDropModule, CdkDragEnd} from "@angular/cdk/drag-drop";
import {ContextMenuModule} from "@perfectmemory/ngx-contextmenu";
import {AddReservationComponent} from "../forms/add-event.component";
import {ModalController} from "@ionic/angular";
import {AlertController, IonIcon, IonItem, IonLabel} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {
    createOutline,
    copyOutline,
    trashOutline,
    cutOutline,
    locate,
    textOutline,
    arrowUndoCircleOutline,
    archiveOutline, eye, person, call,

} from "ionicons/icons";
import {ResizableModule} from "angular-resizable-element";
import {CommonModule} from "@angular/common";
import {
    calculateNewWidth,
    minutesDiff, setBgColor,
    STATUT_ARRIVEE_CLIENT,
    STATUT_DEPART_CLIENT, stringToDate
} from "../../../utils/generic.utils";

import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, MatTooltipModule} from "@angular/material/tooltip";
import {ToolTipRendererDirective} from "../../../directives/tool-tip-renderer.directive";
import {DomSanitizer} from "@angular/platform-browser";
import {TimelineOptionInterface} from "../../../interfaces/timelineOption.interface";

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 0,
    hideDelay: 5000,
    touchendHideDelay: 5000,
    position: "after"
};

@Component({
    selector: 'kesy-timeline-calendar-reservation',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
    imports: [ContextMenuModule, DragDropModule, CdkDropList, CdkDrag, IonIcon, IonItem, IonLabel, ResizableModule, CommonModule, MatTooltipModule,
        ToolTipRendererDirective],
    standalone: true,
    providers: [ModalController, AlertController, {
        provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
        useValue: myCustomTooltipDefaults
    }]
})
export class KesyTimelineEventComponent implements OnInit, AfterViewInit {
    reservation: KesyReservationInterface;
    statutArriveeClient = STATUT_ARRIVEE_CLIENT;
    statutDepartClient = STATUT_DEPART_CLIENT;
    @Input() options: TimelineOptionInterface = {
        rank: "Hotel",
        beginHour: "09:00",
        endHour: "21:00",
        step: 15,
        reportColumn: 'type'
    };

    @Input({required: true}) set curReservation(e) {
        this.reservation = calculateNewWidth(e, this.timelineWidth, this.step);
        let tableKey = this.tables.findIndex(x => x.id === this.reservation.tableId);
        this.reservation.topPos = (Number(this.timelineHeight) * (tableKey + 1)) - Number(this.timelineHeight);
        this.handleHeight = this.timelineHeight - 8;
        this.currentBgColor = setBgColor(this.reservation, this.reservationBgColors);
        this.traitPopupData();
    }

    @Input({required: true}) clients = [];
    @Input() employersSPA = [];
    choixActuel = 'Restaurant';

    @Input({required: true}) set choix(c) {
        this.choixActuel = c;
        if (this.reservation)
            this.traitPopupData();
    }

    @Input({required: true}) beginHour;
    timelineWidth: any = 100;
    currentBgColor: string = '';

    @Input() set width(w) {
        this.timelineWidth = w;
        if (this.reservation) {
            this.reservation = calculateNewWidth(this.reservation, this.timelineWidth, this.step);
            this.height = this.timelineHeight;
            this.currentBgColor = setBgColor(this.reservation, this.reservationBgColors);
        }
    }

    @Input() timelineHeight: any = 50;
    @Input({required: true}) step: Number = 15;
    tables = [];

    @Input('tables') set AllTables(t) {
        this.tables = t;
        if (this.reservation) {
            let tableKey = this.tables.findIndex(x => x.id === this.reservation.tableId);
            this.reservation.topPos = (Number(this.timelineHeight) * (tableKey + 1)) - Number(this.timelineHeight);
        }
    }

    @Output() reservationUpdated = new EventEmitter<{ reservation: any; trait: boolean }>();
    @Output() reservationCreated = new EventEmitter<{ reservation: any; trait: boolean }>();
    @Output() reservationDeleted = new EventEmitter<{ reservation: any; table: any }>();

    @ViewChild('resizeBox', {static: true}) resizeBox: ElementRef;
    @ViewChild('dragHandleRight', {static: true}) dragHandleRight: ElementRef;
    @ViewChild('dragHandleLeft', {static: true}) dragHandleLeft: ElementRef;
    @ViewChild('dragHandleTop', {static: true}) dragHandleTop: ElementRef;
    @ViewChild('dragHandleBottom', {static: true}) dragHandleBottom: ElementRef;

    reservationTooltipHtml = '';

    @Input() reservationBgColors: Map<string, string> = new Map();
    @Input() personBase64;

    constructor(private modalController: ModalController, private alertController: AlertController, private ngZone: NgZone, private _renderer: Renderer2, private cdr: ChangeDetectorRef) {
        addIcons({
            createOutline,
            copyOutline,
            trashOutline,
            cutOutline,
            locate,
            textOutline,
            archiveOutline,
            arrowUndoCircleOutline,
            eye,
            person, call
        });
    }

    explodedHour;
    initWidth = 0;

    ngOnInit() {
        this.explodedHour = this.reservation.beginHour.split(':');
        this.initWidth = this.reservation.width;
        const beginParts = this.beginHour.match(/(\d+)\:(\d+)/);
        const dateBegin = new Date();
        dateBegin.setHours(Number(beginParts[1]), Number(beginParts[2]), 0);
    }


    curResa: any = null;

    editReservation($event, click = false) {
        this.curResa = {...this.reservation};
        this.openFormReservationModal(this.curResa);
    }

    async openFormReservationModal(reservation, showComment = false) {
        const reservationModal = await this.modalController.create({
            component: AddReservationComponent,
            componentProps: {
                formData: reservation,
                tables: this.tables,
                clients: this.clients,
                timelineWidth: this.timelineWidth,
                timelineHeight: this.timelineHeight,
                step: this.step,
                choixActuel: this.choixActuel,
                personBase64: this.personBase64,
                employers: this.employersSPA,
                options: this.options,
                showComment
            }
        });
        reservationModal.onDidDismiss().then((modal) => {
            if (modal !== null && modal.data) {
                if (modal.data.table.id > 0)
                    modal.data.tableId = modal.data.table.id;

                if (modal.data.id > 0)
                    this.reservationUpdated.emit({reservation: modal.data, trait: true});
                else
                    this.reservationCreated.emit({reservation: modal.data, trait: true});
            }
        });
        return await reservationModal.present();
    }

    decouper($event) {
        const _this = this;
        this.confirmAction(
            'Attention !!',
            'Vous êtes sur le point de dupliquer cet évènement. Cette action est irreversible', function () {
                let origReservation = {...stringToDate($event.value.reservation)};
                origReservation.begin = new Date(origReservation.begin.toISOString().split('T')[0] + ' ' + origReservation.beginHour);
                origReservation.end = new Date(origReservation.end.toISOString().split('T')[0] + ' ' + origReservation.endHour);
                origReservation.texte = origReservation.text;
                let dupReservation = {...stringToDate($event.value.reservation)};
                dupReservation.begin = new Date(dupReservation.begin.toISOString().split('T')[0] + ' ' + dupReservation.beginHour);
                dupReservation.end = new Date(dupReservation.end.toISOString().split('T')[0] + ' ' + dupReservation.endHour);
                dupReservation.texte = dupReservation.text + ' découpé';
                dupReservation.eventText = dupReservation.eventText + ' découpé';
                const mouseStep = Math.ceil(_this.mousePosition / Number(_this.timelineWidth));
                const diffMinutes = (Math.round(minutesDiff(origReservation.begin, origReservation.end))) - (mouseStep * Number(_this.step));
                origReservation.end.setMinutes(origReservation.end.getMinutes() - diffMinutes);
                origReservation.endHour = origReservation.end.toTimeString().split(' ')[0].substr(0, 5);
                origReservation = calculateNewWidth(origReservation, _this.timelineWidth, _this.step);
                dupReservation.begin.setMinutes(dupReservation.begin.getMinutes() + diffMinutes);
                dupReservation.beginHour = origReservation.end.toTimeString().split(' ')[0].substr(0, 5);
                dupReservation = calculateNewWidth(dupReservation, _this.timelineWidth, _this.step);
                delete dupReservation.id;
                _this.reservationUpdated.emit({reservation: origReservation, trait: true});
                _this.reservationCreated.emit({reservation: dupReservation, trait: true});
            });
    }


    dupliquer($event) {
        const _this = this;
        this.confirmAction(
            'Attention !!',
            'Vous êtes sur le point de dupliquer cet évènement. Cette action est irreversible', function () {
                const duplicatedReservation = {..._this.reservation, id: 0};
                duplicatedReservation.texte = _this.reservation.text + ' dupliqué';
                duplicatedReservation.eventText = _this.reservation.eventText + ' dupliqué';
                _this.openFormReservationModal(duplicatedReservation);
            });

    }

    desactiver($event) {
        const _this = this;
        this.confirmAction(
            'Attention !!',
            'Vous êtes sur le point de désactiver cet évènement. Cette action est irreversible', function () {
                _this.reservation.actif = false;
                _this.reservationUpdated.emit({reservation: _this.reservation, trait: true});
            });
    }

    supprimer($event) {
        const _this = this;
        this.confirmAction(
            'Attention !!',
            'Vous êtes sur le point de supprimer cet évènement. Cette action est irreversible', function () {
                _this.reservationDeleted.emit({table: _this.reservation.table, reservation: _this.reservation})
            });
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

    get resizeBoxElement(): HTMLElement {
        return this.resizeBox.nativeElement;
    }

    get dragHandleRightElement(): HTMLElement {
        return this.dragHandleRight.nativeElement;
    }

    get dragHandleLeftElement(): HTMLElement {
        return this.dragHandleLeft.nativeElement;
    }

    get dragHandleTopElement(): HTMLElement {
        return this.dragHandleTop.nativeElement;
    }

    get dragHandleBottomElement(): HTMLElement {
        return this.dragHandleBottom.nativeElement;
    }

    ngAfterViewInit() {
        this.setAllHandleTransform();
        //this.traitPopupData();
    }

    traitPopupData() {
        //let chambreLabel = this.options[this.choixActuel][0].column;
    }

    mousePosition: any;

    getMouseCoordinates($event) {
        this.mousePosition = $event.layerX;
    }

    setAllHandleTransform() {
        const rect = this.resizeBoxElement.getBoundingClientRect();
        this.setHandleTransform(this.dragHandleLeftElement, rect, 'x', true, false);
        this.setHandleTransform(this.dragHandleRightElement, rect, 'x', false, false);
        this.setHandleTransform(this.dragHandleTopElement, rect, 'y', false, true);
        this.setHandleTransform(this.dragHandleBottomElement, rect, 'y', false, false);
    }

    positions = {right: {}, left: {}, top: {}, bottom: {}};

    setHandleTransform(
        dragHandle: HTMLElement,
        targetRect: ClientRect | DOMRect,
        position: 'x' | 'y' | 'both',
        isBegin: boolean = false,
        isTop: boolean = false,
    ) {
        const dragRect = dragHandle.getBoundingClientRect();

        if (position === 'x') {
            if (!isBegin) {
                this.positions.right = dragRect;
            } else {
                this.positions.left = dragRect;
            }
        } else {
            if (!isTop) {
                this.positions.bottom = dragRect;
            } else {
                this.positions.top = dragRect;
            }
        }
    }


    dragMove(dragHandle: HTMLElement, $event: CdkDragEnd<any>,
             handlePosition: "left" | "right" | "top" | "bottom") {
        this.ngZone.runOutsideAngular(() => {
            this.resize(dragHandle, this.resizeBoxElement, handlePosition, $event.distance);
        });
    }

    height: number = 0;
    handleHeight: number = 0;

    resize(dragHandle: HTMLElement, target: HTMLElement,
           handlePosition: "left" | "right" | "top" | "bottom", distance: any) {
        const $this = this;
        if (handlePosition == 'top' || handlePosition == 'bottom') {
            const nbLignes = Math.ceil(Math.abs(distance.y) / Number(this.timelineHeight));
            if (nbLignes > 0) {

                const message = 'Attention, vous êtes sur le point de créer ' + nbLignes +
                    ' autres réservations identiques à cette dernière.' +
                    '<br /><br /><strong class="error">Cette action est irreversible !</strong>'
                this.confirmAction('Créer ' + nbLignes + ' autres réservations', message, () => {
                    const tableKey = $this.tables.findIndex(x => x.id === $this.reservation.tableId);
                    if (handlePosition == 'top') {
                        $this.height += (nbLignes * $this.timelineHeight);
                        $this.reservation.topPos -= (nbLignes * $this.timelineHeight);
                    }
                        else {
                        $this.reservation.topPos = (Number($this.timelineHeight) * (tableKey + 1)) - Number($this.timelineHeight);
                        $this.height += (nbLignes * $this.timelineHeight);
                    }
                    $this.handleHeight = $this.height - (nbLignes * 16);
                    let newReservation = {...$this.reservation};
                    delete newReservation.id;
                    for (let i = 1; i <= nbLignes; i++) {
                        if (handlePosition == 'top') {
                            newReservation.table = $this.tables[tableKey - i];
                            newReservation.tableId = $this.tables[tableKey - i].id;
                        } else {
                            newReservation.table = $this.tables[tableKey + i];
                            newReservation.tableId = $this.tables[tableKey + i].id;
                        }
                        $this.reservationCreated.emit({reservation: newReservation, trait: true});
                    }
                    $this.reservationUpdated.emit({reservation: $this.reservation, trait: true});
                });
            }
        } else {
            const message = 'Attention, vous êtes sur le point d\'étirer/ réduire cet évènement.<br />' +
                '<br /><strong class="error">Cette action est irreversible !</strong>'
            $this.confirmAction('Extension/réduction d\e réservtion', message, () => {
                const targetRect = target.getBoundingClientRect();
                const stepNo = Math.ceil(Math.abs(distance.x) / Number($this.timelineWidth));
                const minutesDelta = stepNo * Number($this.step);
                const begin = new Date($this.reservation.begin.toISOString().split('T')[0] + ' ' + $this.reservation.beginHour);
                const end = new Date($this.reservation.end.toISOString().split('T')[0] + ' ' + $this.reservation.endHour);
                if (handlePosition === "left") {
                    let newBegin = new Date(begin);

                    if (distance.x < 0) {
                        newBegin.setMinutes(newBegin.getMinutes() - minutesDelta);
                    } else {
                        newBegin.setMinutes(newBegin.getMinutes() + minutesDelta);
                    }
                    $this.reservation.begin = newBegin;
                    $this.reservation.beginHour = newBegin.toTimeString().split(' ')[0].substr(0, 5);
                    const newWidth = targetRect.width + (distance.x < 0 ? stepNo * Number($this.timelineWidth) : -stepNo * Number($this.timelineWidth));
                    $this.reservation.leftPos = 0;
                    $this.reservation.width = newWidth;
                }
                if (handlePosition === "right") {
                    let newEnd = new Date(end);

                    if (distance.x < 0) {
                        newEnd.setMinutes(newEnd.getMinutes() - minutesDelta);
                    } else {
                        newEnd.setMinutes(newEnd.getMinutes() + minutesDelta);
                    }
                    $this.reservation.end = newEnd;
                    $this.reservation.endHour = newEnd.toTimeString().split(' ')[0].substr(0, 5); // Met à jour endHour

                    const newWidth = targetRect.width + (distance.x < 0 ? -stepNo * Number($this.timelineWidth) : stepNo * Number($this.timelineWidth));
                    $this.reservation.width = newWidth;
                }

                $this.reservationUpdated.emit({reservation: $this.reservation, trait: false});

                $this.dragHandleLeftElement.style.transform = `translate(0px, 0)`;
                $this.dragHandleRightElement.style.transform = `translate(0px, 0)`;
                dragHandle.style.transform = `translate3d(0px, 0px, 0px)`;
                $this.cdr.detectChanges();
            });
        }
        //this.reservation.topPos = this.top + 0;
    }

    changeReservationStatut(reservation, status) {
        if (reservation.status != 1) {
            const _this = this;
            this.confirmAction(
                'Attention !!',
                'Vous êtes sur le point de confirmer que le client de cet évènement est arrivé. Cette action est irreversible', function () {
                    _this.reservation.status = status;
                    _this.reservationUpdated.emit({reservation: _this.reservation, trait: true});
                });
        }
    }

    async addComment() {
        this.openFormReservationModal({...this.reservation}, true);
    }

    getBgColors(type, resa) {
        if ((this.choixActuel == 'SPA' || this.choixActuel == 'Lavage') && resa.employer1) {
            if (type == 'couleurTexte') {
                return resa.employer1 ? resa.employer1.couleurTexte : resa.table.couleurTexte;
            } else {
                return resa.employer1 ? resa.employer1.couleur : resa.table.couleur;
            }
        } else {
            if (type == 'couleurTexte') {
                return resa.table.couleurTexte;
            } else {
                return resa.table.couleur;
            }
        }
    }
}
