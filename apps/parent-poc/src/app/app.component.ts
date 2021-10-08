import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { TranslationVerificationService } from './translation-verification.service';

@Component({
    selector: 'cricuti18n-parent-poc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    languages: string[] = this.translate.getLangs();
    constructor(public translate: TranslateService) {
        this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'nl', 'pt']);
    }

    async ngOnInit() {
        // await this.transVerify.loadParentTranslations();
        // if (this.transVerify.validateTranslations()) {
        //     console.log('Translation keys are valid');
        // } else {
        //     throw Error(`Invalid translation keys: ${this.transVerify.getInvalidKeys()}`);
        // }
    }
}
