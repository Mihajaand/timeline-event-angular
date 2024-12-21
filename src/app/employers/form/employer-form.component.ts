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
import {formatPhoneNumber} from "../../utils/generic.utils";

@Component({
    selector: 'app-form-employer',
    templateUrl: './employer-form.component.html',
    standalone: true,
    imports: [CommonModule, IonHeader, IonCol, IonRow, IonSelect, IonSelectOption, IonInput, IonToolbar, IonTitle, IonContent, IonGrid, ReactiveFormsModule, IonItem, IonButtons, IonFooter, IonButton, IonSearchbar, FormsModule, IonNote],
    styleUrls: ['./employer-form.component.scss'],
})
export class EmployerFormComponent implements OnInit {
    employerForm: FormGroup;
    employer;
    civilites = [
        {value: 'M.', label: 'Monsieur'},
        {value: 'Me.', label: 'Madame'},
        {value: 'Mle', label: 'Mademoiselle'},
    ]

    constructor(private formBuilder: FormBuilder, private modalController: ModalController) {
        this.employerForm = this.formBuilder.group({
            civilite: ['', Validators.required],
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            tel: ['+261'],
            email: [1],
            dateNaissance: [''],
            couleur: ['white', Validators.required],
            couleurTexte: ['black', Validators.required],
            actif: [true, Validators.required],
            observation: ['']
        });
    }


    ngOnInit() {
        this.employerForm.patchValue({
            civilite: this.employer.civilite,
            nom: this.employer.nom,
            prenom: this.employer.prenom,
            tel: this.employer.tel,
            email: this.employer.email,
            dateNaissance: this.employer.dateNaissance,
            couleur: this.employer.couleur,
            couleurTexte: this.employer.couleurTexte,
            observation: this.employer.observation,
            actif: this.employer.actif ,
        });
    }

    getFormControlError(controlName: string, error: string) {
        return (
            this.employerForm.get(controlName).hasError(error) &&
            this.employerForm.get(controlName).touched
        );
    }

    getFormValidationErrors() {
        const errors = {};
        Object.keys(this.employerForm.controls).forEach((key) => {
            const controlErrors = this.employerForm.get(key).errors;
            if (controlErrors) {
                errors[key] = controlErrors;
            }
        });
        return errors;
    }

    onSubmit() {
        if (this.employerForm.valid) {
            if (this.employer.id > 0) {
                this.employerForm.value.id = this.employer.id;
            }
            this.modalController.dismiss(this.employerForm.value, this.employer.id > 0 ? 'edit' : 'create');
        } else {
            const formErrors = this.getFormValidationErrors();  // Récupérer les erreurs de validation
            console.log('Erreurs de validation :', formErrors);
        }
    }

    cancel() {
        this.modalController.dismiss(null, 'cancel');
    }

    phoneNumber:string = '';

    get formattedPhoneNumber(): string {
        return formatPhoneNumber(this.phoneNumber);
    }

    applyMask(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.phoneNumber = input.value.replace(/\D/g, '');// Remove non-numeric characters
        this.employerForm.patchValue({tel: this.formattedPhoneNumber});
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
