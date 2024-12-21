import {Component, ViewChild} from '@angular/core';
import {
    IonContent,
    IonCard,
    IonCardContent,
    IonCardSubtitle, IonCardTitle, IonCardHeader, IonGrid, IonRow, IonCol, IonIcon, IonItem, IonButtons,IonButton, IonLabel
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {apps, calendar, home, people, pricetag, settings, settingsSharp} from "ionicons/icons";
import {KesyKelyHeaderComponent} from "../generic/header/header.component";
import {Router} from "@angular/router";
import {ConfigPopoverComponent} from "../generic/config-popover/config-popover.component";
import {PopoverController} from "@ionic/angular";


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    providers:[Router],
    standalone: true,
    imports: [KesyKelyHeaderComponent, IonContent, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonContent, IonGrid, IonIcon, IonItem, IonButtons,IonButton, IonCol, IonRow, IonLabel]
})
export class HomePage {
    constructor(private router: Router,private popoverController: PopoverController) {
        addIcons({
            settings,
            settingsSharp,
            people,
            apps,
            calendar
        });
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
