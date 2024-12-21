import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'afficher-event',
    templateUrl: './eve.component.html',
    styleUrls: ['./eve.component.scss'],
    imports: [CommonModule],
    standalone: true
})
export class EveComponent implements OnInit {
    @Input() evenement: any;
    @Input() hours: number[];
    @Input() options: any;
    @Input() timelineWidth: any = 100;

    constructor() {
    }

    ngOnInit() {
    }
    calculateLeft(debut: string): number {
        const date = new Date(debut);
        const debutHour = date.getHours();
        const debutMinute = date.getMinutes();

        const [baseHour, baseMinute] = this.options.beginHour.split(':').map(Number);
        const totalMinutes = (debutHour * 60 + debutMinute) - (baseHour * 60 + baseMinute);

        const steps = totalMinutes / this.options.step;
        const leftValue = (steps * this.options.columnWidth + 560) - this.timelineWidth;
        return leftValue;
    }

    calculateWidth(debut: string, fin: string): number {
        const debutDate = new Date(debut);
        const finDate = new Date(fin);

        const debutHour = debutDate.getHours();
        const debutMinute = debutDate.getMinutes();
        const finHour = finDate.getHours();
        const finMinute = finDate.getMinutes();

        const [baseHour] = this.options.beginHour.split(':').map(Number);
        const debutTotalMinutes = (debutHour * 60 + debutMinute) - (baseHour * 60);
        const finTotalMinutes = (finHour * 60 + finMinute) - (baseHour * 60);

        const durationInMinutes = finTotalMinutes - debutTotalMinutes;
        const steps = durationInMinutes / this.options.step;
        const width = steps * this.options.columnWidth;
        return width;
    }


}
