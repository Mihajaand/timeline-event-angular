import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ApiService} from "../services/api.services";
import {
    AlertController, IonButton, IonButtons,
    IonContent, IonFooter, IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList, IonTitle, IonToolbar,
    ToastController
} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";
import {KesyKelyHeaderComponent} from "../generic/header/header.component";
import {
    add,
    briefcase,
    call,
    checkmarkCircleOutline,
    create,
    informationCircleOutline, mail,
    man,
    trash,
    woman
} from "ionicons/icons";
import {StockFormComponent} from "./stock-form/stock-form.component";
import {addIcons} from "ionicons";

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss'],
    standalone: true,
    imports: [CommonModule, KesyKelyHeaderComponent, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton, IonHeader, IonFooter, IonToolbar, IonButtons, IonTitle],
})
export class StockComponent implements OnInit {
    stocks = [];
    isModal:boolean = false;
    selectedStock;
    dureePrix = [
        {key:'horaire',value:'Horaire'},
        {key:'nuitee',value:'Nuitée'},
        {key:'hebdomadaire',value:'Hebdomadaire'},
        {key:'mensuelle',value:'Mensuelle'},
    ];

    constructor(private modalController: ModalController, private db: ApiService, private toastController: ToastController, private alertController: AlertController) {
        addIcons({man, woman, briefcase, create, trash, checkmarkCircleOutline, call, mail, add});
    }

    ngOnInit() {
        if (!this.isModal) {
            this.stocks = [];
            this.db.getList('stock').subscribe({
                next: (stocks) => {
                    this.stocks = stocks;
                },
                error: (error) => {
                    console.error('There was an error!', error);
                }
            });
        }
    }
    selectStock(stock: any) {
        this.selectedStock = stock;
        if (this.isModal)
            this.modalController.dismiss(this.selectedStock);
    }

    nouveauStock() {
        this.isModal = true;
        this.openPopup({id: 0});
    }

    editStock(stock) {
        this.openPopup(stock);
    }
    cancel(){
        this.modalController.dismiss();
    }

    async openPopup(stock) {
        const stockModal = await this.modalController.create({
            component: StockFormComponent,
            componentProps: {
                stock: stock,
            },
            cssClass: 'add-stock-modal',
        });

        stockModal.onDidDismiss().then((modal) => {
            if (modal !== null && modal.data) {
                if (modal.role == 'create') {
                    this.db.add('stock', modal.data).subscribe({
                        next: async (response) => {
                            this._showMessage('Création éfféctuée avec succès !');
                            this.stocks.push(response);
                            this.selectedStock = response;
                            if (this.isModal) {
                                this.modalController.dismiss(this.selectedStock);
                            }
                        },
                        error: (error) => {
                            console.error('There was an error!', error);
                            this._showMessage('Création non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
                        }
                    });
                } else {
                    this.db.edit('stock', stock.id, modal.data).subscribe({
                        next: async (response) => {
                            this.selectedStock = response;
                            this._showMessage('Création éfféctuée avec succès !');
                            const index = this.stocks.findIndex(e => e.id === stock.id);
                            if (index !== -1) {
                                this.stocks[index] = response;
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
        return await stockModal.present();
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

    async deleteStock(stock) {
        const _this = this;
        const alert = await this.alertController.create({
            header: 'Attention, vous allez supprimer cette ligne !!',
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
                        _this.db.delete('stock', stock.id).subscribe({
                            next: async (response) => {
                                _this.stocks = response;
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

}
