import {Component, OnInit} from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {Router} from "@angular/router";
import {IonItem, IonLabel, IonList} from "@ionic/angular/standalone";

@Component({
    selector: 'app-config-popover',
    templateUrl: './config-popover.component.html',
    styleUrls: ['./config-popover.component.scss'],
    providers: [],
    imports: [IonList, IonItem, IonLabel],
    standalone: true,
})
export class ConfigPopoverComponent implements OnInit {

    constructor(private popoverController: PopoverController, private router: Router) {
    }

    ngOnInit() {
    }

    close() {
        this.popoverController.dismiss();
    }

    openStocks = () => {
        this.router.navigate(['/stocks']);
        this.close();
    };

    openCoursDeChange = () => {
        this.router.navigate(['/currencies']);
        this.close();
    };

    openParametrages = () => {
        this.router.navigate(['/parametres']);
        this.close();
    };
    openPays = () => {
        this.router.navigate(['/pays']);
        this.close();
    };

    openEmployers = () => {
        this.router.navigate(['/employers']);
        this.close();
    };

}
