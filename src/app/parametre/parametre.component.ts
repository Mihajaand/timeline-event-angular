import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.services";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent, IonFooter,
    IonGrid, IonIcon,
    IonInput,
    IonItem, IonLabel, IonList,
    IonNote, IonReorder, IonReorderGroup,
    IonRow, IonSelect,
    IonSelectOption, IonTitle, IonToggle, IonToolbar, ToastController
} from "@ionic/angular/standalone";
import {KesyKelyHeaderComponent} from "../generic/header/header.component";
import {addIcons} from "ionicons";
import {add, create, informationCircleOutline, reorderThree, trash} from "ionicons/icons";
import {CdkDragDrop, DragDropModule, moveItemInArray} from "@angular/cdk/drag-drop";
import {getRankConteneurList} from "../utils/generic.utils";

@Component({
    selector: 'app-parametre',
    templateUrl: './parametre.component.html',
    styleUrls: ['./parametre.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, IonContent, KesyKelyHeaderComponent, IonTitle, IonFooter, IonToolbar,
        IonButtons, IonButton, IonGrid, IonRow, IonCol, IonItem, IonInput, IonNote, IonSelectOption, IonSelect, IonIcon, IonToggle, IonLabel,
        DragDropModule, IonReorderGroup, IonReorder, IonList],
    standalone: true,
})
export class ParametreComponent implements OnInit {
    parametres: any;
    form;
    formType;
    choix: string[] = ['Restaurant', 'Hotel', 'SPA', 'Lavage','Location de salle'];
    choixData: any = [];
    saisieEnCours: boolean = false;
    rankList = [
        {key: 'Hotel', value: 'HOTEL'},
        {key: 'Restaurant', value: 'RESTAURANT'},
    ]
    colors = [
        'success',
        'secondary',
        'tertiary',
        'warning',
        'medium'
    ];

    constructor(private formBuilder: FormBuilder, private db: ApiService, private toastController: ToastController) {
        addIcons({create, trash, add, reorderThree});
        this.formType = this.formBuilder.group({
            column: ['', Validators.required],
            columnData: ['', Validators.required],
            fixed: [false, Validators.required],
        });
        this.form = this.formBuilder.group({
            reportColumn: ['type', Validators.required],
            beginHour: ['09:00', Validators.required],
            endHour: ['21:00', Validators.required],
            step: ['15', Validators.required],
            columnWidth: ['60', Validators.required],
            leftColumnWidth: ['70', Validators.required],
            columnHeight: ['28', Validators.required],
            rank: ['Hotel', Validators.required],
        });
    }

    currentRank = 'Hotel';

    rankHotelData = getRankConteneurList('Hotel');
    rankRestaurantData = getRankConteneurList('Restaurant');

    get rankConteneurHotel(){
        return getRankConteneurList('Hotel');
    }
    get rankConteneurRestaurant(){
        return getRankConteneurList('Restaurant');
    }

    ngOnInit() {
        this.choix.forEach((ch, k) => {
            this.choixData[ch] = [];
        })
        this.db.getList('config').subscribe({
            next: (parametres) => {
                const p = parametres.filter(p => p.name == 'parametres');
                if (p[0]) {
                    this.parametres = p[0];
                    this.choix.forEach((d, k) => {
                        this.choixData[d] = this.parametres.value[d] === undefined ? [] : this.parametres.value[d];
                    });
                    this.form.patchValue({
                        reportColumn: this.parametres.value.reportColumn,
                        beginHour: this.parametres.value.beginHour,
                        endHour: this.parametres.value.endHour,
                        step: this.parametres.value.step,
                        columnWidth: this.parametres.value.columnWidth,
                        leftColumnWidth: this.parametres.value.leftColumnWidth || 70,
                        columnHeight: this.parametres.value.columnHeight,
                        rank: this.parametres.value.rank,
                    });
                    this.currentRank = this.parametres.value.rank || 'Hotel';
                    this.rankHotelData = this.parametres.value.rankHotelData || getRankConteneurList('Hotel');
                    this.rankRestaurantData = this.parametres.value.rankRestaurantData || getRankConteneurList('Restaurant');
                }
                //console.log(this.parametres);
            },
            error: (error) => {
                console.error('There was an error!', error);
            }
        });
    }

    getFormControlError(form, controlName: string, error: string) {
        return (
            form.get(controlName).hasError(error) &&
            form.get(controlName).touched
        );
    }

    getFormValidationErrors(form) {
        const errors = {};
        Object.keys(form.controls).forEach((key) => {
            const controlErrors = form.get(key).errors;
            if (controlErrors) {
                errors[key] = controlErrors;
            }
        });
        return errors;
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

    onSubmit() {
        if (this.form.valid) {
            const data = Object.assign({}, this.choixData, this.form.value);
            data.rankHotelData = this.rankHotelData;
            data.rankRestaurantData = this.rankRestaurantData;
            if (this.parametres && this.parametres.id > 0) {
                this.db.edit('config', this.parametres.id, {name: 'parametres', value: data}).subscribe({
                    next: async (response:any) => {
                        this._showMessage('Modification éfféctuée avec succès !');
                        this.parametres = response;
                    },
                    error: (error) => {
                        console.error('There was an error!', error);
                        this._showMessage('Modification non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                    }
                });
            } else {
                this.db.add('config', {name: 'parametres', value: data}).subscribe({
                    next: async (response:any) => {
                        this._showMessage('Création éfféctuée avec succès !');
                        this.parametres = response;
                    },
                    error: (error) => {
                        console.error('There was an error!', error);
                        this._showMessage('Création non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                    }
                });
            }
        } else {
            const formErrors = this.getFormValidationErrors(this.formType);  // Récupérer les erreurs de validation
            console.log('Erreurs de validation :', formErrors);
        }
    }

    onSubmitType(type) {
        if (this.formType.valid) {
            if (this.editType && this.editTypeIdx > -1) {
                this.choixData[type][this.editTypeIdx] = this.formType.value;
                this.editTypeIdx = -1;
            } else {
                this.choixData[type].push(this.formType.value);
            }
            this.cancelType();
            //console.log(this.choixData);
        } else {
            const formErrors = this.getFormValidationErrors(this.formType);  // Récupérer les erreurs de validation
            console.log('Erreurs de validation :', formErrors);
        }
    }

    getChoixData(type) {
        const dataObj = this.choixData.filter(f => f.type == type);
        //console.log(dataObj);
        return dataObj;
    }

    cancelType() {
        this.saisieEnCours = false;
        this.formType.patchValue({
            column: '',
            columnData: '',
            fixed: false,
        })
    }

    curSaisieType = '';

    saisieType(type) {
        this.saisieEnCours = true;
        this.curSaisieType = type;
    }

    editType: boolean = false;
    editTypeIdx = -1;

    modifierType(choixActuel, idxType) {
        this.editTypeIdx = idxType;
        this.curSaisieType = choixActuel;
        this.editType = true;
        this.saisieEnCours = true;
        const dataObj = this.choixData[choixActuel][idxType];
        this.formType.patchValue(dataObj);
    }

    deleteType(choixActuel, data) {
        this.choixData[choixActuel] = this.choixData[choixActuel].filter(c => c != data);
    }

    drop(event: CdkDragDrop<string[]>, choixActuel): void {
        moveItemInArray(this.choixData[choixActuel], event.previousIndex, event.currentIndex);
    }

    doReorder(event: CustomEvent) {
        if (this.currentRank == 'Hotel') {
            const itemToMove = this.rankHotelData.splice(event.detail.from, 1)[0];
            this.rankHotelData.splice(event.detail.to, 0, itemToMove);
        } else {
            const itemToMove = this.rankRestaurantData.splice(event.detail.from, 1)[0];
            this.rankRestaurantData.splice(event.detail.to, 0, itemToMove);
        }
        event.detail.complete();
    }

    doReorderTables(event: CustomEvent,choixActuel) {
        const itemToMove = this.choixData[choixActuel].splice(event.detail.from, 1)[0];
        this.choixData[choixActuel].splice(event.detail.to, 0, itemToMove);
        event.detail.complete();
    }

    changeRank(event) {
        this.currentRank = event.detail.value;
    }
}
