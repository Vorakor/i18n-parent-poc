import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';

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
                {
                    path: ''
                    // loadChildren: () => import('@parent-poc/page-poc').then((module) => module.PagePocModule)
                }
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
    providers: [TranslatePipe, UpperCasePipe, LowerCasePipe],
    bootstrap: [AppComponent]
})
export class AppModule {}
