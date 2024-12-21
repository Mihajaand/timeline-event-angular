import {Component, OnInit} from '@angular/core';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-employers-modal',
    templateUrl: './employers-modal.component.html',
    styleUrls: ['./employers-modal.component.scss'],
    standalone: true,
    imports: [CommonModule, IonList, IonItem, IonLabel, IonHeader, IonContent, IonTitle, IonButton, IonButtons, IonToolbar]
})
export class EmployersModalComponent implements OnInit {
    options;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
    }

    selectOption(option: any) {
        this.modalController.dismiss(option);
    }

    dismiss() {
        this.modalController.dismiss();
    }
}
