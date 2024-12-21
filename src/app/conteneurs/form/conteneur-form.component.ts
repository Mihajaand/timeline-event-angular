import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {
    AbstractControl,
    FormBuilder,
    FormGroup, FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {
    IonButton,
    IonButtons,
    IonCol, IonContent, IonFooter, IonGrid,
    IonHeader,
    IonInput, IonItem, IonNote,
    IonRow, IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from "@ionic/angular/standalone";
import {TimelineOptionInterface} from "../../interfaces/timelineOption.interface";

@Component({
    selector: 'app-form',
    templateUrl: './conteneur-form.component.html',
    standalone: true,
    imports: [CommonModule, IonHeader, IonCol, IonRow, IonSelect, IonSelectOption, IonInput, IonToolbar, IonTitle, IonContent, IonGrid, ReactiveFormsModule, IonItem, IonButtons, IonFooter, IonButton, IonSearchbar, FormsModule, IonNote],
    styleUrls: ['./conteneur-form.component.scss'],
})
export class ConteneurFormComponent implements OnInit {
    tableForm: FormGroup;
    types = [
        {value: 'C', label: 'Carré'},
        {value: 'RC', label: 'Rectangle'},
        {value: 'R', label: 'Ronde'},
        {value: 'O', label: 'Ovale'},
    ]
    formes = [
        {value: 'carre', label: 'Carré'},
        {value: 'rectangle', label: 'Rectangle'},
        {value: 'ronde', label: 'Ronde'},
        {value: 'ovale', label: 'Ovale'},
    ]
    table;
    flags = [];
    filteredFlags: any[] = [];
    searchTerm: string = '';
    choix = [];
    choixActuel = 'Restaurant';
    options: TimelineOptionInterface = {
        rank: "Hotel",
        beginHour: "09:00",
        endHour: "21:00",
        step: 15,
        reportColumn: 'type'
    };
    constructor(private formBuilder: FormBuilder, private modalController: ModalController) {
        this.tableForm = this.formBuilder.group({
            conteneur: ['', Validators.required],
            type: ['', Validators.required],
            forme: ['', Validators.required],
            nbPlace: [1, Validators.required],
            nom: ['', Validators.required],
            emplacement: ['', Validators.required],
            couleur: ['white', Validators.required],
            couleurTexte: ['black', Validators.required]
        });
    }

    get type(): AbstractControl {
        return this.tableForm.get('type');
    }

    get forme(): AbstractControl {
        return this.tableForm.get('forme');
    }

    ngOnInit() {
        this.tableForm.patchValue({
            conteneur: this.table.conteneur || this.choixActuel,
            type: this.table.type,
            forme: this.table.forme,
            nbPlace: this.table.nbPlace,
            nom: this.table.nom,
            emplacement: this.table.emplacement,
            couleur: this.table.couleur,
            couleurTexte: this.table.couleurTexte
        });
        this.changeType(this.table.type);
    }

    changeType(t) {
        let type = t;
        if (t !== undefined && t.detail !== undefined) {
            type = t.detail.value
        }
        const index = this.types.findIndex(p => p.value == type);
        this.tableForm.patchValue({
            type: this.types[index].value,
            forme: this.formes[index].value
        })
    }

    getFormControlError(controlName: string, error: string) {
        return (
            this.tableForm.get(controlName).hasError(error) &&
            this.tableForm.get(controlName).touched
        );
    }

    getFormValidationErrors() {
        const errors = {};
        Object.keys(this.tableForm.controls).forEach((key) => {
            const controlErrors = this.tableForm.get(key).errors;
            if (controlErrors) {
                errors[key] = controlErrors;
            }
        });
        return errors;
    }

    onSubmit() {
        if (this.tableForm.valid) {
            if (this.table.id > 0) {
                this.tableForm.value.id = this.table.id;
            }
            this.modalController.dismiss(this.tableForm.value, this.table.id > 0 ? 'edit' : 'create');
        } else {
            const formErrors = this.getFormValidationErrors();  // Récupérer les erreurs de validation
            console.log('Erreurs de validation :', formErrors);
        }
    }

    cancel() {
        this.modalController.dismiss(null, 'cancel');
    }
    changeChoix(c){
        this.choixActuel = c.detail.value
    }
}

export function refValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const regex = /^FC_\d{6}$/; // Le format 'FC_' suivi de 6 chiffres

        // Vérifie si la valeur correspond au pattern 'FC_000003'
        if (value && !regex.test(value)) {
            return {invalidFcCode: true}; // Retourne une erreur si la validation échoue
        }

        return null; // Sinon, retourne null pour indiquer que tout est valide
    };
}
