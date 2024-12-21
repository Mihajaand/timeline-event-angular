import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {ApiService} from "../services/api.services";
import {KesyKelyHeaderComponent} from "../generic/header/header.component";
import {
    AlertController,
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
    ToastController
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {
    add,
    briefcase,
    call,
    checkmarkCircleOutline,
    create,
    informationCircleOutline,
    mail,
    man,
    trash,
    woman
} from "ionicons/icons";
import {ClientComponent} from "./client/client.component";

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
    standalone: true,
    imports: [CommonModule, KesyKelyHeaderComponent,IonAvatar, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton, IonHeader, IonFooter, IonToolbar, IonButtons, IonTitle],
})
export class ClientsComponent implements OnInit {
    clients: any[] = [];
    flags: any[] = [];
    selectedClient;
    isModal: boolean = false;

    constructor(private modalController: ModalController, private db: ApiService, private toastController: ToastController, private alertController: AlertController) {
        addIcons({man, woman, briefcase, create, trash, checkmarkCircleOutline, call, mail, add});
    }
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

    getCiviliteText(civilite) {
        const idx = this.civilites.findIndex(c => c.value == civilite);
        if (idx >= 0) {
            return this.civilites[idx].label;
        }
        return civilite;
    }
    ngOnInit() {
        if (!this.isModal) {
            this.clients = [];
            this.db.getList('client').subscribe({
                next: (clients:any) => {
                    this.clients = clients;
                },
                error: (error) => {
                    console.error('There was an error!', error);
                }
            });

            this.flags = [];
            this.db.getList('flag').subscribe({
                next: (flags:any) => {
                    this.flags = flags;
                },
                error: (error) => {
                    console.error('There was an error!', error);
                }
            });
        }
    }

    selectClient(client: any) {
        this.selectedClient = client;
        if (this.isModal)
            this.modalController.dismiss(this.selectedClient);
    }

    nouveauClient() {
        this.openPopup({id: 0});
    }

    editClient(client) {
        this.openPopup(client);
    }
    cancel(){
        this.modalController.dismiss();
    }



    async openPopup(client) {
        const $this = this;
        console.log($this.flags);
        const clientModal = await $this.modalController.create({
            component: ClientComponent,
            componentProps: {
                client: client,
                flags: $this.flags
            },
            cssClass: 'add-client-modal',
        });

        clientModal.onDidDismiss().then((modal) => {
            if (modal !== null && modal.data) {
                if (modal.role == 'create') {
                    $this.db.add('client', modal.data).subscribe({
                        next: async (response: any) => {
                            $this._showMessage('Création éfféctuée avec succès !');
                            $this.clients.push(response);
                            $this.selectedClient = response;
                            if ($this.isModal) {
                                $this.modalController.dismiss($this.selectedClient);
                            }
                        },
                        error: (error) => {
                            console.error('There was an error!', error);
                            $this._showMessage('Création non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                        }
                    });
                } else {
                    $this.db.edit('client', client.id, modal.data).subscribe({
                        next: async (response: any) => {
                            $this.selectedClient = response;
                            $this._showMessage('Création éfféctuée avec succès !');
                            const index = $this.clients.findIndex(e => e.id === client.id);
                            if (index !== -1) {
                                $this.clients[index] = response;
                            }
                        },
                        error: (error) => {
                            console.error('There was an error!', error);
                            $this._showMessage('Création non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                        }
                    });
                }
            }
        });
        return await clientModal.present();
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

    async deleteClient(client) {
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
                        _this.db.delete('client', client.id).subscribe({
                            next: async (response:any) => {
                                _this.clients = response;
                                await this._showMessage('Suppression efféctuée avec succès !');
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
}
