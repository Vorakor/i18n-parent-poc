import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IDetails, VehiclesService } from '@child-poc/shared';
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
    constructor(private dealService: DealershipService, private vService: VehiclesService) {
        this.vService.loadVehicles();
    }

    ngOnInit(): void {}
}
