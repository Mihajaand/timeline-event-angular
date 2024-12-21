import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {CommonModule, DatePipe} from '@angular/common';
import {
    AlertController,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonDatetime,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar
} from "@ionic/angular/standalone";
import {minutesDiff, stringToDate, traitReservationText} from "../../../utils/generic.utils";
import {addIcons} from "ionicons";
import {add, call, eye, mail} from "ionicons/icons";
import {ClientsComponent} from "../../../clients/clients.component";
import {ConteneursComponent} from "../../../conteneurs/conteneurs.component";
import {EmployersModalComponent} from "../../../employers/form/employers-modal/employers-modal.component";

@Component({
    selector: 'add-reservation',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss'],
    standalone: true,
    providers: [DatePipe, ModalController, AlertController],
    imports: [CommonModule, ReactiveFormsModule, IonItem, IonInput, IonRow, IonCol,
        IonText, IonButton, IonHeader, IonToolbar, IonButtons, IonFooter, IonLabel, IonTitle,
        IonContent, IonSelect, IonSelectOption, IonDatetime, IonTextarea, IonGrid, IonRow, IonCol, IonIcon, IonNote,
        EmployersModalComponent],
})
export class AddReservationComponent implements OnInit {
    showComment: boolean = false;
    reservationForm: FormGroup;
    formData;
    tables = [];
    clients = [];
    flags = [];
    timelineWidth = 0;
    timelineHeight = 0;
    step = 0;
    minDate = new Date();
    choixActuel = 'Restaurant';
    options;
    personBase64 = '';
    employers = [];
    @ViewChild('nameInput') nameInput: ElementRef;

    constructor(private formBuilder: FormBuilder, private modalController: ModalController, private datePipe: DatePipe) {
        this.reservationForm = this.formBuilder.group({
            client: ['', Validators.required],
            beginHour: [this.datePipe.transform(new Date(), "HH:mm"), [Validators.required]],
            endHour: [this.datePipe.transform(new Date(), "HH:mm"), Validators.required],
            begin: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
            end: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), Validators.required],
            table: ['', Validators.required],
            nbPerson: [1, [Validators.required]],
            employer1: [''],
            employer2: [''],
            commentaire: [''],
        });

        addIcons({
                eye, add, call, mail
            }
        )
    }

    employer1Obj = {civilite: '', prenom: '', couleur: '', couleurTexte: '', actif: 0};
    employer2Obj = {civilite: '', prenom: '', couleur: '', couleurTexte: '', actif: 0};

    async openEmployersModal(employer: number = 1) {
        const modal = await this.modalController.create({
            component: EmployersModalComponent,
            componentProps: {
                options: this.employers.filter(e => e.actif == 1)
            },
            cssClass: 'employers-modal',
        });

        modal.onDidDismiss().then((data) => {
            if (data.data) {
                if (employer == 1) {
                    this.employer1Obj = data.data;
                    this.reservationForm.patchValue({employer1: data.data.id});
                } else {
                    this.employer2Obj = data.data;
                    this.reservationForm.patchValue({employer2: data.data.id});
                }
            }
        });

        return await modal.present();
    }

    get nbPerson(): AbstractControl {
        return this.reservationForm.get('nbPerson');
    }

    get commentaire(): AbstractControl {
        return this.reservationForm.get('commentaire');
    }

    get employer1(): AbstractControl {
        return this.reservationForm.get('employer1');
    }

    get employer2(): AbstractControl {
        return this.reservationForm.get('employer2');
    }

    maxNbPlaces = 1;

    ngOnInit() {
        this.reservationForm.patchValue({
            client: this.formData.client?.id || '',
            table: this.formData.table.id,
            beginHour: this.formData.beginHour,
            begin: this.datePipe.transform(this.formData.begin, "yyyy-MM-dd"),
            end: this.datePipe.transform(this.formData.end, "yyyy-MM-dd"),
            endHour: this.formData.endHour,
            nbPerson: this.formData.nbPerson,
            employer1: (this.choixActuel == 'SPA' || this.choixActuel == 'Lavage') ? this.formData.employer1 : null,
            employer2: (this.choixActuel == 'SPA' || this.choixActuel == 'Lavage') ? this.formData.employer2 : null,
            commentaire: this.formData.commentaire,
        });
        this.employer1Obj = this.formData.employer1 ? this.employers.filter(c => c.id == this.formData.employer1.id)[0] : {
            civilite: '', prenom: '', couleur: '', actif: 0, couleurTexte: ''
        };
        this.employer2Obj = this.formData.employer1 ? this.employers.filter(c => c.id == this.formData.employer2.id)[0] : {
            civilite: '', prenom: '', couleur: '', actif: 0, couleurTexte: ''
        };
        if (this.formData.table && this.formData.table.nbPlace) {
            this.maxNbPlaces = this.formData.table.nbPlace;
            this.nbPerson.patchValue(this.maxNbPlaces);
            this.nbPerson.setValidators([Validators.required, Validators.max(Number(this.formData.table.nbPlace))]);
            this.nbPerson.updateValueAndValidity();
        }
        if (this.showComment) {
            this.commentaire.setValidators([Validators.required]);
            this.commentaire.updateValueAndValidity();
        } else {
            this.commentaire.removeValidators([Validators.required]);
            this.commentaire.updateValueAndValidity();
        }
        if ((this.choixActuel == 'SPA' || this.choixActuel == 'Lavage')) {
            this.employer1.addValidators([Validators.required]);
        } else {
            this.employer1.removeValidators([Validators.required]);
        }
        this.minDate = new Date();
    }

    onSubmit() {
        if (this.reservationForm.valid) {
            this.reservationForm.value.client = this.clients.find(c => c.id == this.reservationForm.value.client);
            this.reservationForm.value.table = this.tables.find(c => c.id == this.reservationForm.value.table);
            this.reservationForm.value.employer1 = this.employers.find(c => c.id == this.reservationForm.value.employer1);
            this.reservationForm.value.employer2 = this.employers.find(c => c.id == this.reservationForm.value.employer2);
            this.reservationForm.value.texte = this.reservationForm.value.texte;
            if (this.formData.id > 0) {
                this.reservationForm.value.id = this.formData.id;
            } else {
                this.reservationForm.value.id = 0;
            }
            let reservation = stringToDate({...this.reservationForm.value});
            const tableIndex = this.tables.findIndex(t => t.id === reservation.table.id);
            reservation.topPos = this.timelineHeight * (tableIndex);
            reservation.leftPos = 0;
            reservation.width = minutesDiff(reservation.begin, reservation.end) / this.step;
            reservation = traitReservationText(reservation);
            //this.reservationForm.value.begin = this.reservationForm.value.begin.fomat
            this.modalController.dismiss(reservation, this.formData.id == 0 ? 'create' : 'edit');
        }
    }

    cancel() {
        this.modalController.dismiss(null, 'cancel');
    }

    checkBeginDate($event) {
        //if(this.reservationForm.get('begin').value.getT)
        const begin = new Date(this.reservationForm.get('begin').value);
        const end = new Date(this.reservationForm.get('end').value);
        if (begin.getTime() > end.getTime()) {
            this.reservationForm.patchValue({
                end: this.datePipe.transform(begin, "yyyy-MM-dd"),

            });
        }

    }

    checkEndDate($event) {
        const today = new Date();
        today.setHours(0, 0, 0);
        const beginDate = new Date($event.target.value + ' 00:00:00');
        if (beginDate.getTime() >= today.getTime()) {
            this.reservationForm.patchValue({
                end: $event.target.value
            });
        } else {
            this.reservationForm.patchValue({
                begin: this.datePipe.transform(today, "yyyy-MM-dd"),
                end: this.datePipe.transform(today, "yyyy-MM-dd")
            });
        }
    }

    async openClientPopup() {
        const _this = this;
        const clientModal = await _this.modalController.create({
            component: ClientsComponent,
            componentProps: {
                clients: _this.clients,
                flags: _this.flags,
                isModal: true
            },
            cssClass: 'second-modal',
        });

        clientModal.onDidDismiss().then((modal) => {
            if (modal !== null && modal.data) {
                _this.formData.client = modal.data;
                this.reservationForm.patchValue({
                    client: modal.data.id || ''
                });
            }
        });
        return await clientModal.present();
    }

    async openTablePopup() {
        const _this = this;
        const tableModal = await _this.modalController.create({
            component: ConteneursComponent,
            componentProps: {
                tables: _this.tables,
                isModal: true,
                options: this.options
            },
            cssClass: 'second-modal',
        });

        tableModal.onDidDismiss().then((modal) => {
            if (modal !== null && modal.data) {
                _this.formData.table = modal.data;
                this.reservationForm.patchValue({
                    table: modal.data.id || ''
                });

                if (modal.data.nbPlace > 0) {
                    this.maxNbPlaces = modal.data.nbPlace;
                    this.nbPerson.patchValue(this.maxNbPlaces);
                    this.nbPerson.setValidators([Validators.required, Validators.max(Number(modal.data.nbPlace))]);
                    this.nbPerson.updateValueAndValidity();
                }

            }
        });
        return await tableModal.present();
    }

    getFormControlError(controlName: string, error: string) {
        return (
            this.reservationForm.get(controlName).hasError(error) &&
            this.reservationForm.get(controlName).touched
        );
    }
}
