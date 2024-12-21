import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonNote,
    IonRow,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from "@ionic/angular/standalone";
import {formatPhoneNumber} from "../../utils/generic.utils";
import {PaysComponent} from "../../pays/pays.component";
import {addIcons} from "ionicons";
import {flag} from "ionicons/icons";

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    standalone: true,
    imports: [CommonModule, IonHeader, IonCol, IonRow, IonSelect, IonSelectOption, IonInput, IonToolbar, IonTitle, IonContent, IonGrid, ReactiveFormsModule, IonItem, IonButtons, IonFooter, IonButton, IonSearchbar, FormsModule, IonNote, IonAvatar, IonIcon],
    styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
    clientForm: FormGroup;
    categories = [
        {value: 'particulier', label: 'Particulier'},
        {value: 'societe', label: 'Entreprise'}
    ];
    civilites = [
        {value: 'M.', label: 'Monsieur'},
        {value: 'Me.', label: 'Madame'},
        //{value: 'Mle', label: 'Mademoiselle'},
        {value: 'Me. M.', label: 'Madame, Monsieur'},
        {value: 'M. Me.', label: 'Monsieur, Madame'},
        {value: 'Mss.', label: 'Miss'},
        {value: 'Mr.', label: 'Mister'},
        {value: 'Mi.', label: 'Maître'},
        {value: 'Dr.', label: 'Docteur'},
    ];
    client;
    flags = [];
    filteredFlags: any[] = [];
    searchTerm: string = '';

    constructor(private formBuilder: FormBuilder, private modalController: ModalController, private loadingController: LoadingController) {
        addIcons({flag});
        this.clientForm = this.formBuilder.group({
            categorieClient: ['particulier', Validators.required],
            raisonSociale: ['',],
            nif: ['',],
            cif: ['',],
            stat: ['',],
            civilite: ['M.', Validators.required],
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            pays: ['', Validators.required],
            tel: ['', Validators.required],
            tel2: [''],
            email: ['', [Validators.required, Validators.email]],
            dateNaissance: ['', Validators.required],
            observation: [''],
        });
    }

    ngOnInit() {
        this.clientForm.patchValue({
            categorieClient: this.client.categorieClient,
            ref: this.client.ref,
            raisonSociale: this.client.raisonSociale,
            nif: this.client.nif,
            cif: this.client.cif,
            stat: this.client.stat,
            civilite: this.client.civilite,
            nom: this.client.nom,
            prenom: this.client.prenom,
            tel: this.client.tel,
            tel2: this.client.tel2,
            email: this.client.email,
            dateNaissance: this.client.dateNaissance,
            observation: this.client.observation,
            pays: this.client.pays?.id | 0,
        });
        this.changeCategory(this.client.categorieClient);
        console.log(this.client)
    }

    isEntreprise = false;

    get raisonSociale(): AbstractControl {
        return this.clientForm.get('raisonSociale');
    }

    get nif(): AbstractControl {
        return this.clientForm.get('nif');
    }

    get cif(): AbstractControl {
        return this.clientForm.get('cif');
    }

    get stat(): AbstractControl {
        return this.clientForm.get('stat');
    }

    getFormControlError(controlName: string, error: string) {
        return (
            this.clientForm.get(controlName).hasError(error) &&
            this.clientForm.get(controlName).touched
        );
    }

    changeCategory(newCat) {
        let categorie = newCat;
        if (newCat !== undefined && newCat.detail !== undefined) {
            categorie = newCat.detail.value
        }
        this.isEntreprise = categorie == 'societe';
        if (this.isEntreprise) {
            this.raisonSociale.setValidators([Validators.required]);
            this.raisonSociale.updateValueAndValidity();
            this.nif.setValidators([Validators.required]);
            this.nif.updateValueAndValidity();
            this.cif.setValidators([Validators.required]);
            this.cif.updateValueAndValidity();
            this.stat.setValidators([Validators.required]);
            this.stat.updateValueAndValidity();
        } else {
            this.raisonSociale.removeValidators([Validators.required]);
            this.raisonSociale.updateValueAndValidity();
            this.nif.removeValidators([Validators.required]);
            this.nif.updateValueAndValidity();
            this.cif.removeValidators([Validators.required]);
            this.cif.updateValueAndValidity();
            this.stat.removeValidators([Validators.required]);
            this.stat.updateValueAndValidity();
        }
    }

    getFormValidationErrors() {
        const errors = {};
        Object.keys(this.clientForm.controls).forEach((key) => {
            const controlErrors = this.clientForm.get(key).errors;
            if (controlErrors) {
                errors[key] = controlErrors;
            }
        });
        return errors;
    }

    onSubmit() {
        if (this.clientForm.valid) {
            this.clientForm.value.nom = this.clientForm.value.nom.toUpperCase();
            this.clientForm.value.raisonSociale = this.clientForm.value.raisonSociale;
            this.modalController.dismiss(this.clientForm.value, this.client.id > 0 ? 'edit' : 'create');
        } else {
            const formErrors = this.getFormValidationErrors();  // Récupérer les erreurs de validation
            //console.log('Erreurs de validation :', formErrors);
        }
    }

    cancel() {
        this.modalController.dismiss(null, 'cancel');
    }


    applyMask(nb, event: Event): void {
        const input = event.target as HTMLInputElement;
        if (nb == 1) {
            const phoneNumber = input.value.replace(/\D/g, '');
            this.clientForm.patchValue({tel: formatPhoneNumber(phoneNumber)});// Remove non-numeric characters
        } else {
            const phoneNumber = input.value.replace(/\D/g, '');
            this.clientForm.patchValue({tel2: formatPhoneNumber(phoneNumber)});// Remove non-numeric characters
        }
    }

    async changePays() {
        const $this = this;
        await $this.showLoader();
        const paysModal = await $this.modalController.create({
            component: PaysComponent,
            componentProps: {
                countries: $this.flags,
                isModal: true
            },
            cssClass: 'countries-modal',
        });

        paysModal.onDidDismiss().then((modal) => {
            if (modal !== null && modal.data) {
                console.log(modal.data);
                $this.clientForm.patchValue({pays: modal.data.id});
                $this.client.pays = modal.data;
            }
        });
        return await paysModal.present();
    }

    isLoading = false;

    async showLoader() {
        this.isLoading = true;

        const loading = await this.loadingController.create({
            message: 'Veuillez patienter...',
            spinner: 'crescent', // style du spinner : "bubbles", "circles", "crescent", etc.
            duration: 1000 // optionnel, temps d'affichage
        });

        await loading.present();

        // Exemple pour cacher le loader manuellement après 3 secondes
        setTimeout(() => {
            this.isLoading = false;
            loading.dismiss();
        }, 1000);
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
