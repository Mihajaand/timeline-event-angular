import {Component, OnInit, Input, TemplateRef} from '@angular/core';
import {CommonModule} from "@angular/common";
import {addIcons} from "ionicons";
import {IonAvatar, IonCol, IonGrid, IonIcon, IonRow} from "@ionic/angular/standalone";
import {
     call, mail
} from "ionicons/icons";
import {TimelineOptionInterface} from "../../../../interfaces/timelineOption.interface";

@Component({
    selector: 'app-custom-tool-tip',
    templateUrl: './custom-tooltip.component.html',
    standalone: true,
    imports: [CommonModule, IonIcon, IonGrid, IonRow,IonCol, IonAvatar],
    styleUrls: ['./custom-tooltip.component.scss']
})
export class CustomToolTipComponent implements OnInit {
    @Input() text: string;
    @Input() choixActuel: string;
    @Input() options: TimelineOptionInterface ={
        rank: "Hotel",
        beginHour: "09:00",
        endHour: "21:00",
        step: 15,
        reportColumn: 'type'
    };
    curReservation: any;
    @Input() set reservation(r){
        this.curReservation = r;
    } // Le nom de l'icône

    @Input() contentTemplate: TemplateRef<any>;

    constructor() {
        addIcons({
            mail, call
        });
    }

    ngOnInit() {
    }

    getBgColors(type, resa){
        if ((this.choixActuel == 'SPA' ||  this.choixActuel=='Lavage') && resa.employer1) {
            if (type == 'couleurTexte') {
                return resa.employer1 ? resa.employer1.couleurTexte : resa.table.couleurTexte;
            } else {
                return resa.employer1 ? resa.employer1.couleur : resa.table.couleur;
            }
        } else {
            if (type == 'couleurTexte') {
                return resa.table.couleurTexte;
            } else {
                return resa.table.couleur;
            }
        }
    }

}
