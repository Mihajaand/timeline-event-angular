import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
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
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-stock-form',
    templateUrl: './stock-form.component.html',
    styleUrls: ['./stock-form.component.scss'],
    standalone: true,
    imports: [CommonModule, IonHeader, IonCol, IonRow, IonSelect, IonSelectOption, IonInput, IonToolbar, IonTitle, IonContent, IonGrid, ReactiveFormsModule, IonItem, IonButtons, IonFooter, IonButton, IonSearchbar, FormsModule, IonNote],

})
export class StockFormComponent implements OnInit {
    stockForm: FormGroup;
    dureePrix = [
        {key:'horaire',value:'Horaire'},
        {key:'nuitee',value:'Nuitée'},
        {key:'hebdomadaire',value:'Hebdomadaire'},
        {key:'mensuelle',value:'Mensuelle'},
    ];
    stock;
    constructor(private formBuilder: FormBuilder, private modalController: ModalController) {
        this.stockForm = this.formBuilder.group({
            name: ['', Validators.required],
            qte: ['', Validators.required],
            prix: ['', Validators.required],
            dureePrix: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.stockForm.patchValue({
            categorieClient: this.stock.categorieClient,
            name: this.stock.name,
            qte: this.stock.qte,
            prix: this.stock.prix,
            dureePrix: this.stock.dureePrix
        });
    }

    isEntreprise = false;

    get raisonSociale(): AbstractControl {
        return this.stockForm.get('raisonSociale');
    }

    get nif(): AbstractControl {
        return this.stockForm.get('nif');
    }

    get cif(): AbstractControl {
        return this.stockForm.get('cif');
    }

    get stat(): AbstractControl {
        return this.stockForm.get('stat');
    }

    getFormControlError(controlName: string, error: string) {
        return (
            this.stockForm.get(controlName).hasError(error) &&
            this.stockForm.get(controlName).touched
        );
    }

    getFormValidationErrors() {
        const errors = {};
        Object.keys(this.stockForm.controls).forEach((key) => {
            const controlErrors = this.stockForm.get(key).errors;
            if (controlErrors) {
                errors[key] = controlErrors;
            }
        });
        return errors;
    }

    onSubmit() {
        if (this.stockForm.valid) {
            this.modalController.dismiss(this.stockForm.value, this.stock.id > 0 ?'edit':'create');
        }else{
            const formErrors = this.getFormValidationErrors();  // Récupérer les erreurs de validation
            console.log('Erreurs de validation :', formErrors);
        }
    }

    cancel() {
        this.modalController.dismiss(null, 'cancel');
    }

}
