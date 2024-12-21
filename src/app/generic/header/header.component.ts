import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    IonBackButton, IonButton,
    IonButtons, IonCol, IonContent,
    IonHeader, IonIcon, IonItem, IonLabel, IonPopover, IonRow,
    IonTitle,
    IonToolbar, MenuController
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {apps, calendar, home, people, settings, settingsSharp} from "ionicons/icons";
import {Router} from "@angular/router";
import {PopoverController} from "@ionic/angular";
import {ConfigPopoverComponent} from "../config-popover/config-popover.component";

@Component({
    selector: 'kesykely-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [Router],
    imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons, IonIcon, IonItem, IonButton, IonCol, IonRow, IonPopover, IonContent, IonLabel],
    standalone: true,
})
export class KesyKelyHeaderComponent implements OnInit {
    @Input() showBackBtn: boolean = false;


    constructor(public menuCtrl: MenuController,private popoverController: PopoverController) {
        addIcons({
            settings,
            settingsSharp,
            people,
            apps,
            calendar, home
        });
    }

    ngOnInit() {
    }

    async openConfigMenu(event: Event) {
        const popover = await this.popoverController.create({
            component: ConfigPopoverComponent,
            event, // positionne le popover par rapport à l'élément cliqué
            translucent: true,
        });
        await popover.present();
    }

}
