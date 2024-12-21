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
    call,
    checkmarkCircleOutline,
    create,
    informationCircleOutline,
    mail,
    man,
    trash,
    woman
} from "ionicons/icons";
import {ConteneurFormComponent} from "./form/conteneur-form.component";
import {TimelineOptionInterface} from "../interfaces/timelineOption.interface";
import {getRankConteneurList} from "../utils/generic.utils";

@Component({
    selector: 'app-conteneurs',
    templateUrl: './conteneurs.component.html',
    styleUrls: ['./conteneurs.component.scss'],
    standalone: true,
    imports: [CommonModule, KesyKelyHeaderComponent, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton, IonHeader, IonFooter, IonToolbar, IonButtons, IonTitle, IonTabs, IonTabBar, IonTabButton],
})
export class ConteneursComponent implements OnInit {
    tables: any[];
    flags: any[];
    selectedTable;
    choix: any[];
    choixActuel = 'Restaurant';
    isModal: boolean = false;
    personBase64: string = 'data:image/png;base64,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'
    options: TimelineOptionInterface = {
        rank: "Hotel",
        beginHour: "09:00",
        endHour: "21:00",
        step: 15,
        reportColumn: 'type'
    };
    data: any = [];

    colors = [
        'success',
        'secondary',
        'tertiary',
        'warning',
    ];

    constructor(private modalController: ModalController, private db: ApiService, private toastController: ToastController, private alertController: AlertController) {
        addIcons({man, woman, briefcase, create, trash, checkmarkCircleOutline, call, mail, add});
    }

    ngOnInit() {
        this.choix = getRankConteneurList(this.options.rank);
        this.choix.forEach((choi, k) => {
            this.data[choi] = [];
        })
        if (!this.isModal) {
            this.tables = [];
            this.db.getList('table').subscribe({
                next: (response: any) => {
                    this.tables = response.tables;
                    this.data = this.tables.filter(f => f.conteneur == this.choixActuel);
                },
                error: (error) => {
                    console.error('There was an error!', error);
                }
            });
        } else {
            this.data = [...this.tables];
            this.db.getList('flag').subscribe({
                next: (flags:any) => {
                    this.flags = flags;
                },
                error: (error) => {
                    console.error('There was an error!', error);
                }
            });
            this.db.getList('config').subscribe({
                next: (parametres:any) => {
                    const p = parametres.filter(p => p.name == 'parametres');
                    if (p[0]) {
                        this.options = p[0].value;
                    }
                    //console.log(this.parametres);
                },
                error: (error) => {
                    console.error('There was an error!', error);
                }
            });
        }
    }

    selectTable(table: any) {
        this.selectedTable = table;
        if (this.isModal)
            this.modalController.dismiss(this.selectedTable);
    }

    nouveauTable() {
        this.openPopup({id: 0, nbPlace: 1, couleur: '#FFFFFF', couleurTexte: '#000000', type: 'C', forme: 'carre'});
    }

    editTable(table) {
        this.openPopup(table);
    }

    cancel() {
        this.modalController.dismiss();
    }

    async openPopup(table) {
        const tableModal = await this.modalController.create({
            component: ConteneurFormComponent,
            componentProps: {
                table: table,
                flags: this.flags,
                choix: this.choix,
                choixActuel: this.choixActuel,
                options: this.options
            },
            cssClass: 'add-form-modal',
        });

        tableModal.onDidDismiss().then((modal) => {
            if (modal !== null && modal.data) {
                if (modal.role == 'create') {
                    this.db.add('table', modal.data).subscribe({
                        next: async (response:any) => {
                            this._showMessage('Création éfféctuée avec succès !');
                            this.tables.push(response);
                            this.data[response.conteneur].push(response);
                            this.selectedTable = modal.data;
                            if (this.isModal) {
                                this.modalController.dismiss(this.selectedTable);
                            }
                        },
                        error: (error) => {
                            console.error('There was an error!', error);
                            this._showMessage('Création non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                            this.selectedTable = modal.data;
                        }
                    });
                } else {
                    this.db.edit('table', table.id, modal.data).subscribe({
                        next: async (response:any) => {
                            this._showMessage('Création éfféctuée avec succès !');
                            const index = this.tables.findIndex(e => e.id === table.id);
                            if (index !== -1) {
                                this.tables[index] = response;
                            }
                            const i = this.data[response.conteneur].findIndex(e => e.id === table.id);
                            if (index !== -1) {
                                this.data[response.conteneur][i] = response;
                            }
                        },
                        error: (error) => {
                            console.error('There was an error!', error);
                            this._showMessage('Création non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                        }
                    });
                }
            }
        });
        return await tableModal.present();
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

    async deleteTable(table) {
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
                        _this.db.delete('table', table.id).subscribe({
                            next: async (response:any) => {
                                _this.tables = response;
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

    changeChoix(c) {
        this.choixActuel = c;
    }

}
