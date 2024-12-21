import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {KesyKelyHeaderComponent} from "../generic/header/header.component";
import {
    IonButton, IonButtons,
    IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader,
    IonItem,
    IonList,
    IonRow, IonSearchbar,
    IonTitle,
    IonToolbar, ToastController
} from "@ionic/angular/standalone";
import {ApiService} from "../services/api.services";
import {informationCircleOutline} from "ionicons/icons";
import {addIcons} from "ionicons";

@Component({
    selector: 'app-currencies',
    templateUrl: './currencies.component.html',
    styleUrls: ['./currencies.component.scss'],
    standalone: true,
    imports: [CommonModule, KesyKelyHeaderComponent, IonHeader, IonToolbar, IonContent, IonTitle, IonGrid, IonRow, IonCol, IonItem, IonList, IonButton, IonSearchbar, IonFooter, IonButtons]
})
export class CurrenciesComponent implements OnInit {
    flags: any[] = [];

    constructor(private db: ApiService, private toastController: ToastController) {
        addIcons({informationCircleOutline});
    }

    ngOnInit() {
        this.flags = [];
        this.db.getList('flag').subscribe({
            next: (flags: any[]) => {
                this.flags = flags;
                this.filter('');
            },
            error: (error) => {
                console.error('There was an error!', error);
            }
        });
        this.configs = [];
        this.db.getList('config').subscribe({
            next: (configs:any) => {
                this.configs = configs;
                const index = this.configs.findIndex(c => c.name == 'currencies');
                if (index > -1) {
                    this.selectedItems = this.configs[index].value;
                    this.currentConfig = this.configs[index];
                }
            },
            error: (error) => {
                console.error('There was an error!', error);
            }
        });
    }

    currentConfig;
    availableItems = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    selectedItems: any[] = [];

    moveToSelected(item, flag) {
        //this.availableItems = this.availableItems.filter(i => i !== item);
        this.selectedItems.push({code: item, flag});
    }

    moveToAvailable(item, flag) {
        this.selectedItems = this.selectedItems.filter(i => i.code !== item);
        // this.availableItems.push(item);
    }

    configs = [];
    filteredFlags = [];

    filter($evt) {
        let filter = $evt;
        if ($evt.detail !== undefined) {
            filter = $evt.detail.value;
        }
        if (filter.length >= 2) {
            if ($evt == '') {
                this.filteredFlags = [...this.flags];
            } else {
                this.filteredFlags = this.flags.filter(flag => flag.currencyName.toLowerCase().includes(filter.toLowerCase())
                    || flag.currencyCode.toLowerCase().includes(filter.toLowerCase())
                    || flag.name.toLowerCase().includes(filter.toLowerCase())
                );
            }
        } else {
            this.filteredFlags = [...this.flags];
        }
    }

    save() {
        this.currentConfig.value = this.selectedItems;
        this.db.edit('config', this.currentConfig.id, this.currentConfig).subscribe({
            next: async (response:any) => {
                this._showMessage('La liste des devises a bien été enregistrée dans les configurations !', 'success');
            },
            error: (error) => {
                console.error('There was an error!', error);
                this._showMessage('Création non éfféctuée. veuillez vérifier les informations saisies !', 'danger');
            }
        });
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
}
