import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonToolbar,
    IonTitle,
    IonDatetimeButton, IonDatetime, IonModal, IonGrid, IonRow, IonCol, IonIcon, ToastController, AlertController
} from '@ionic/angular/standalone';
import {CommonModule} from "@angular/common";
import {addIcons} from "ionicons";
import {add,  pencil, save, trash,informationCircleOutline} from "ionicons/icons";

@Component({
    selector: 'app-evenement',
    templateUrl: './evenement.component.html',
    styleUrls: ['./evenement.component.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonDatetimeButton,
        IonTitle, IonContent, ReactiveFormsModule, IonItem,
        IonFooter, IonButton, IonButtons,IonGrid, IonRow, IonCol,
        IonInput, IonLabel, IonDatetime, IonModal, CommonModule, IonIcon],

})
export class EvenementComponent implements OnInit {
    evenementForm: FormGroup;
    currentControl: string;
    formData: any;
    yearEvenements: any[];
    isNew = false;
    eventId: number | null = 0;

    constructor(private formBuilder: FormBuilder, private modalController: ModalController,  private toastController: ToastController, private alertController: AlertController) {
        this.evenementForm = this.formBuilder.group({
            nom: ['', Validators.required],
            debut: ['', Validators.required],
            heureDebut: ['', Validators.required],
            fin: ['', Validators.required],
            heureFin: ['', Validators.required],
            couleur: ['', Validators.required],
            couleurTexte: ['', Validators.required],
        });
        addIcons({
            pencil,save, trash, add, informationCircleOutline
        });
    }

    ngOnInit() {
        this.evenementForm.patchValue({
            nom: this.formData.nom || '',
            debut: this.formData.debut ? this.formData.debut.split(' ')[0] : '',
            heureDebut: this.formData.debut ? this.formData.debut.split(' ')[1] : '',
            fin: this.formData.fin ? this.formData.fin.split(' ')[0] : '',
            heureFin: this.formData.fin ? this.formData.fin.split(' ')[1] : '',
            couleur: [this.formData.couleur.toString() || '#ffffff'],
            couleurTexte: this.formData.couleurTexte.toString() || '#000000',
        });
    }


    openDatetimeModal(controlName: string) {
        this.currentControl = controlName;
    }

    onDatetimeChange(event: any) {
        const selectedDate = event.detail.value;
        this.evenementForm.get(this.currentControl).setValue(selectedDate); // Mettre à jour le champ de formulaire
        //this.datetimeModal.dismiss(); // Fermer le modal
    }
    onSubmit() {
        if (this.evenementForm.valid) {
            if(this.isNew && this.eventId == 0){
                this.modalController.dismiss(this.evenementForm.value,"create");
            }else{
                this.evenementForm.value.id= this.eventId;
                this.modalController.dismiss(this.evenementForm.value,"edit");

            }
        }
    }

    cancel() {
        this.isNew = false;
    }
    close() {
        this.modalController.dismiss(null, 'cancel');
    }


    dateObjToString(d) {
        //console.log(d);
        return d.split('T')[0]
    }
    onEditEvent(event){
        if(event && event.id){
            this.evenementForm.patchValue({
                nom: event.nom || '',
                debut: event.debut.substring(0, 10) ? event.debut.substring(0, 10) : '',
                heureDebut:event.heureDebut,
                fin: event.fin.substring(0, 10) ? event.fin.substring(0, 10): '',
                heureFin: event.heureFin,
                couleur: event.couleur,
                couleurTexte: event.couleurTexte,
            });
            this.eventId = event.id;
            this.isNew = true;
        }

    }
    async deleteEvent(evenement) {
        const alert = await this.alertController.create({
            header: 'Attention !!',
            message: '<div class="ion-text-center">Vous êtes sur le point d\'effectuer une action irreversible</div>',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                },
                {
                    text: 'OUI, Je confirme',
                    role: 'delete',
                    handler: () => {
                        this.modalController.dismiss(evenement,"delete");

                        /*   this.db.delete('evenement', evenement.id).subscribe({
                                next: (response) => {
                                    this._showMessage('Suppression effectuée avec succès !');
                                },
                                error: (error) => {
                                    console.error('Erreur lors de la suppression', error);
                                    this._showMessage('Échec de la suppression.', 'danger');
                                }
                            });

                            this.yearEvenements = this.yearEvenements.filter(e => e.id !== evenement.id);*/
                    }
                }
            ]
        });
        await alert.present();
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

    nouveau(){
        this.isNew = true;
        this.eventId = 0;
    }

}
