import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IDetails, VehiclesService } from '@child-poc/shared';
// import { DetailsService } from '@child-poc/vehicle-details';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDealership } from '../../models/dealership';
import { DealershipService } from '../../services/dealership.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    public newDealerships$: Observable<IDealership[]> = this.dealService.dealerships$.pipe(
        map((dealerships) =>
            dealerships.filter((dealership) => dealership.inventory.filter((vehicle: IDetails) => parseInt(vehicle.odometer) <= 2000).length > 0)
        )
    );
    public usedDealerships$: Observable<IDealership[]> = this.dealService.dealerships$.pipe(
        map((dealerships) =>
            dealerships.filter((dealership) => dealership.inventory.filter((vehicle: IDetails) => parseInt(vehicle.odometer) >= 2000).length > 0)
        )
    );
    constructor(private translation: TranslateService, private dealService: DealershipService, private vService: VehiclesService) {
        this.vService.loadVehicles();
        this.vService.selectedVehicle$.subscribe((v) => {
            if (v == null || v == undefined || Object.keys(v).length == 0) {
                this.vService.setVehicle(1);
            }
        });
        // const detailsTranslation = this.detService.translations$.subscribe((translations) => console.log(translations));
        // const detailsTranslation = this.translation
        //     .getTranslation(this.translation.currentLang ? this.translation.currentLang : this.translation.defaultLang)
        //     .subscribe((trans) => console.log(trans));
        // this.dealService.subs.push(detailsTranslation);
        // this.translation.setTranslation(this.translation.currentLang, this.detService.getTranslations(this.translation.currentLang), true);
    }

    ngOnInit(): void {}
}
