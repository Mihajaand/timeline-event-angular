import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonItem, IonLabel} from "@ionic/angular/standalone";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ToolTipRendererDirective} from "../../../directives/tool-tip-renderer.directive";
import {TimelineOptionInterface} from "../../../interfaces/timelineOption.interface";

@Component({
    selector: 'kesy-left-pane-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    standalone: true,
    imports: [CommonModule, IonItem, IonLabel, MatTooltipModule, ToolTipRendererDirective]
})
export class KesyLeftPaneItemComponent implements OnInit {
    @Input() data: any[] = [];
    @Input() options: TimelineOptionInterface ={
        rank: "Hotel",
        beginHour: "09:00",
        endHour: "21:00",
        step: 15,
        reportColumn: 'type'
    };
    @Input() choixActuel: string = '';
    load: boolean = false;

    @Input() set Loaded(l) {
        this.load = l;
    }

    constructor() {
    }

    ngOnInit() {
    }

    getBgColors(type, resa){
        if ((this.choixActuel == 'SPA' || this.choixActuel == 'Lavage') && resa.employer1) {
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
