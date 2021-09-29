import { Injectable, OnDestroy } from '@angular/core';
import { TranslationKeys as InventoryKeys } from '@child-poc/inventory';
import { TranslationKeys as VehicleDetailsKeys } from '@child-poc/vehicle-details';
import { TranslationKeys as VehiclesKeys } from '@child-poc/vehicles';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TranslationVerificationService implements OnDestroy {
    public childTranslationKeys: string[] = [...InventoryKeys, ...VehicleDetailsKeys, ...VehiclesKeys];
    public parentTranslationKeys: string[] = [];
    private subs: Subscription[] = [];
    constructor(private translate: TranslateService) {
        const gT = this.translate
            .getTranslation(this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang)
            .pipe(
                distinctUntilChanged(),
                filter((trans) => trans !== null || trans !== undefined)
            )
            .subscribe((translations) => {
                console.log(Object.keys(translations));
                console.log(this.childTranslationKeys);
                if (translations) {
                    this.parentTranslationKeys = Object.keys(translations);
                }
            });
    }

    ngOnDestroy() {
        this.subs.forEach((subscription) => subscription.unsubscribe());
    }
}
