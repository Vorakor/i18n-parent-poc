import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationVerificationService } from './translation-verification.service';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/translations/', '.json');
}
@NgModule({
    declarations: [AppComponent, SelectLanguageComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(
            [
                { path: '', pathMatch: 'full', redirectTo: 'dealerships' },
                { path: 'dealerships', loadChildren: () => import('@parent-poc/dealerships').then((module) => module.DealershipsModule) },
                { path: 'manufacturers', loadChildren: () => import('@parent-poc/manufacturers').then((module) => module.ManufacturersModule) },
                { path: 'inventory', loadChildren: () => import('@child-poc/inventory').then((module) => module.InventoryModule) },
                { path: 'vehicle-details', loadChildren: () => import('@child-poc/vehicle-details').then((module) => module.VehicleDetailsModule) }
            ],
            { initialNavigation: 'enabled' }
        ),
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule
    ],
    providers: [TranslatePipe, UpperCasePipe, LowerCasePipe, TranslationVerificationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
