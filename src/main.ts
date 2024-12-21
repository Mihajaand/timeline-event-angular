import {enableProdMode, importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import {IonicRouteStrategy, provideIonicAngular} from '@ionic/angular/standalone';

import {routes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {environment} from './environments/environment';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {IonicModule} from "@ionic/angular";
import {provideEnvironmentNgxMask} from "ngx-mask";
import {NgxMaskConfig} from 'ngx-mask'

if (environment.production) {
    enableProdMode();
}
const maskConfig: Partial<NgxMaskConfig> = {
    validation: true,
    triggerOnMaskChange: true,
    specialCharacters: ['(', ')', '\ ', '\+'],
    showMaskTyped: true
};
bootstrapApplication(AppComponent, {
    providers: [
        provideAnimations(),
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        provideIonicAngular(),
        provideRouter(routes, withPreloading(PreloadAllModules)),
        provideHttpClient(),
        importProvidersFrom(
            IonicModule.forRoot(
                {innerHTMLTemplatesEnabled: true} // Added
            )
        ),
        provideEnvironmentNgxMask(),
    ],
}).catch((err) => console.error(err));
