import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'cricuti18n-parent-poc-test2-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    languages: string[] = this.translate.getLangs();
    constructor(public translate: TranslateService) {
        this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'nl', 'pt']);
    }
}
