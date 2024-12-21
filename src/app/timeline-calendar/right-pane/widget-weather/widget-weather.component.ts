import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {IonSkeletonText} from "@ionic/angular/standalone";

@Component({
    selector: 'app-widget-weather',
    templateUrl: './widget-weather.component.html',
    styleUrls: ['./widget-weather.component.scss'],
    imports: [CommonModule, HttpClientModule, IonSkeletonText],
    standalone: true
})
export class WidgetWeatherComponent implements OnInit, OnDestroy {
    apiKey = 'ba5937181a96db3f01a0ae0451252f37';
    latitude: number;
    longitude: number;

    constructor(private http: HttpClient) {
    }

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (position) {
                            console.log(
                                'Latitude: ' +
                                position.coords.latitude +
                                'Longitude: ' +
                                position.coords.longitude
                            );
                            let lat = position.coords.latitude;
                            let lng = position.coords.longitude;

                            const location = {
                                lat,
                                lng,
                            };
                            resolve(location);
                        }
                    },
                    (error) => console.log(error)
                );
            } else {
                reject('Geolocation is not supported by this browser.');
            }
        });
    }

    result;
    timerId;

    async ngOnInit() {
        await this.getWeatherDAta();
        this.timerId = setInterval(async () => {
            await this.getWeatherDAta();
        }, 1000 * 60 * 5);
    }

    ngOnDestroy() {
        // Nettoyer l'intervalle pour éviter les fuites de mémoire
        if (this.timerId) {
            clearInterval(this.timerId);
        }

    }

    async getWeatherDAta() {
        const coordinates: any = await this.getCurrentLocation();
        this.latitude = coordinates.lat;
        this.longitude = coordinates.lng;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=metric&lang=fr`;
        this.http.get<any>(url).subscribe(
            response => {
                this.result = response;
                if (this.result.weather[0].icon) {
                    this.result.icon = `https://openweathermap.org/img/w/${this.result.weather[0].icon}.png`;
                }
                //console.log(this.result);
            },
            error => {
                console.error('Error fetching data', error);
            }
        );
    }
}
