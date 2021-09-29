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
    private invalidKeys: string[] = [];
    private subs: Subscription[] = [];
    constructor(private translate: TranslateService) {}

    async loadParentTranslations(): Promise<void> {
        return this.translate
            .getTranslation(this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang)
            .pipe(
                distinctUntilChanged(),
                filter((trans) => trans !== null || trans !== undefined)
            )
            .toPromise()
            .then((trans) => {
                this.parentTranslationKeys = Object.keys(trans);
            });
    }

    validateTranslations(): boolean | void {
        this.invalidKeys = [];
        if (this.parentTranslationKeys.length > 0) {
            this.childTranslationKeys.forEach((key) => {
                if (this.parentTranslationKeys.indexOf(key) == -1) {
                    if (this.invalidKeys.indexOf(key) == -1) {
                        this.invalidKeys.push(key);
                    }
                }
            });
            return this.invalidKeys.length > 0 ? false : true;
        }
    }

    getInvalidKeys(): string[] {
        return this.invalidKeys;
    }

    ngOnDestroy() {
        this.subs.forEach((subscription) => subscription.unsubscribe());
    }
}
