import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {ApiService} from "../services/api.services";
import {KesyKelyHeaderComponent} from "../generic/header/header.component";
import {
    AlertController,
    IonButton, IonButtons,
    IonContent, IonFooter, IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList, IonTitle, IonToolbar,
    ToastController, IonTabs, IonTabBar, IonTabButton
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {
    add,
    briefcase,
    call, checkmarkCircle,
    checkmarkCircleOutline, closeCircle,
    create,
    informationCircleOutline,
    mail,
    man,
    trash,
    woman
} from "ionicons/icons";
import {EmployerFormComponent} from "./form/employer-form.component";

@Component({
    selector: 'app-employers',
    templateUrl: './employers.component.html',
    styleUrls: ['./employers.component.scss'],
    standalone: true,
    imports: [CommonModule, KesyKelyHeaderComponent, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton, IonHeader, IonFooter, IonToolbar, IonButtons, IonTitle, IonTabs, IonTabBar, IonTabButton],
})
export class EmployersComponent implements OnInit {
    isModal: boolean = false;

    data: any = [];

    constructor(private modalController: ModalController, private db: ApiService, private toastController: ToastController, private alertController: AlertController) {
        addIcons({
            man, woman, briefcase, create, trash, checkmarkCircleOutline, call, mail, add, checkmarkCircle,
            closeCircle,
        });
    }

    ngOnInit() {

        if (!this.isModal) {
            this.data = [];
            this.db.getList('employer', [
                {key: "conteneur", value: 'SPA'}
            ]).subscribe({
                next: (response: any) => {
                    this.data = response;
                },
                error: (error) => {
                    console.error('There was an error!', error);
                }
            });
        }
    }

    nouveauEmployer() {
        this.openPopup({id: 0, couleur: '#FFFFFF'});
    }

    editEmployer(employer) {
        this.openPopup(employer);
    }

    cancel() {
        this.modalController.dismiss();
    }

    selectEmployer(employer: any) {
        this.selectedEmployer = employer;
        if (this.isModal)
            this.modalController.dismiss(this.selectedEmployer);
    }

    selectedEmployer;

    async openPopup(employer) {
        const employerModal = await this.modalController.create({
            component: EmployerFormComponent,
            componentProps: {
                employer: employer
            },
            cssClass: 'add-form-modal',
        });

        employerModal.onDidDismiss().then((modal) => {
            if (modal !== null && modal.data) {
                if (modal.role == 'create') {
                    this.db.add('employer', modal.data).subscribe({
                        next: async (response: any) => {
                            this._showMessage('Création éfféctuée avec succès !');
                            this.data.push(response);
                            this.selectedEmployer = response;
                        },
                        error: (error) => {
                            console.error('There was an error!', error);
                            this._showMessage('Création non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                        }
                    });
                } else {
                    this.db.edit('employer', employer.id, modal.data).subscribe({
                        next: async (response: any) => {
                            this._showMessage('Modification éfféctuée avec succès !');
                            const index = this.data.findIndex(e => e.id === employer.id);
                            if (index !== -1) {
                                this.data[index] = response;
                                this.selectedEmployer = response;
                            }
                        },
                        error: (error) => {
                            console.error('There was an error!', error);
                            this._showMessage('Modification non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                        }
                    });
                }
            }
            if (this.isModal) {
                this.modalController.dismiss(this.selectedEmployer);
            }
        });
        return await employerModal.present();
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

    async deleteEmployer(employer) {
        const _this = this;
        const alert = await this.alertController.create({
            header: 'Attention !!',
            message: '<div class="ion-text-center">Vous êtes sur le point d\'effectuer une action irreversible</div>',
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
                        _this.db.delete('employer', employer.id).subscribe({
                            next: async (response: any) => {
                                _this.data = response;
                                this._showMessage('Suppression efféctuée avec succès !');
                            },
                            error: (error) => {
                                console.error('There was an error!', error);
                                this._showMessage('Suppression non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                            }
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    async actifEmployer(emp) {
        const alert = await this.alertController.create({
            header: 'Attention !!',
            message: '<div class="ion-text-center">Vous êtes sur le point de changer le statut d\'un employé! Cela aura des impacts importants dans le travail.</div>',
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
                        emp.actif = !emp.actif;
                        this.db.edit('employer', emp.id, emp).subscribe({
                            next: async (response: any) => {
                                this._showMessage('Modification éfféctuée avec succès !');
                                const index = this.data.findIndex(e => emp.id === e.id);
                                if (index !== -1) {
                                    this.data[index] = response;
                                    this.selectedEmployer = response;
                                }
                            },
                            error: (error) => {
                                console.error('There was an error!', error);
                                this._showMessage('Création non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                            }
                        });
                    }
                }]
        });
        await alert.present();
    }
}
