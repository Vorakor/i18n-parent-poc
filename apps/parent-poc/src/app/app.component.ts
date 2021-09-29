import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationVerificationService } from './translation-verification.service';

@Component({
    selector: 'cricuti18n-parent-poc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    languages: string[] = this.translate.getLangs();
    constructor(public translate: TranslateService, public transVerify: TranslationVerificationService) {
        this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'nl', 'pt']);
    }
}
