import {Component, OnInit} from '@angular/core';
import {Country} from "../interfaces/Country.interface";
import {CommonModule} from "@angular/common";
import {
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
    IonSearchbar,
    IonTitle,
    IonToolbar
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {LoadingController, ModalController} from "@ionic/angular";
import {ApiService} from "../services/api.services";
import {KesyKelyHeaderComponent} from "../generic/header/header.component";
import {addIcons} from "ionicons";
import {star, starOutline} from "ionicons/icons";

@Component({
    selector: 'app-pays',
    templateUrl: './pays.component.html',
    styleUrls: ['./pays.component.scss'],
    standalone: true,
    imports: [CommonModule, KesyKelyHeaderComponent, IonLabel, IonIcon, IonList, IonAvatar, IonItem, IonHeader, IonContent, IonFooter, IonToolbar, IonSearchbar, IonTitle, FormsModule, IonButtons, IonButton]
})
export class PaysComponent implements OnInit {
    countries: Country[] = [];
    filteredCountries: Country[] = [];
    searchTerm: string = '';

    constructor(private modalController: ModalController, private db: ApiService,private loadingController: LoadingController) {
        addIcons({star, starOutline})
    }

    cancel() {
        this.modalController.dismiss(null, 'cancel');
    }

    isModal = false;

    ngOnInit() {
        if (!this.isModal) {
            this.showLoader();
            this.countries = [];
            this.db.getList('flag').subscribe({
                next: (flags: any) => {
                    this.countries = flags;
                    this.filteredCountries = [...this.countries];
                    this.searchTerm = '';
                    this.dismissLoading();
                },
                error: (error) => {
                    console.error('There was an error!', error);
                }
            });
        } else {
            this.filteredCountries = [...this.countries];
        }
        console.log(this.filterCountries());
    }

    filterCountries() {
        this.filteredCountries = this.countries.filter((country) =>
            country.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            country.nationality.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            country.officialName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            country.currencyName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    selectPays(country) {
        this.modalController.dismiss(country, 'select');
    }

    setFavory(country) {
        if (!this.isModal) {
            this.showLoader('Enregistrement des modifications en cours, merci de patienter !');
            this.db.edit('flag', country.id, {favory: !country.favory}).subscribe({
                next: (flags: any) => {
                    this.countries = flags;
                    this.filteredCountries = [...this.countries];
                    this.searchTerm = '';
                    this.dismissLoading();
                },
                error: (error) => {
                    console.error('There was an error!', error);
                }
            });
        }
    }
    isLoading = false;
    async showLoader(message = 'Chargement des données, merci de patienter...') {
        this.isLoading = true;

        const loading = await this.loadingController.create({
            message,
            spinner: 'crescent', // style du spinner : "bubbles", "circles", "crescent", etc.
            duration: 1000 // optionnel, temps d'affichage
        });

        await loading.present();

        // Exemple pour cacher le loader manuellement après 3 secondes
        setTimeout(() => {
            this.isLoading = false;
            this.dismissLoading();
        }, 1000);
    }

    async dismissLoading() {
        // Check if there is an active loading overlay before dismissing it
        const topLoader = await this.loadingController.getTop();
        if (topLoader) {
            await this.loadingController.dismiss();
        }
    }
}
