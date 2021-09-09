import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDealership } from '../models/dealership';
import * as data from '../data/dealerships.json';
import { InventoryService } from '@child-poc/shared';

@Injectable({
    providedIn: 'root'
})
export class DealershipService implements OnDestroy {
    private _nullDealership: IDealership = {
        id: 0,
        name: '',
        address: { streetNumber: '', route: '', locality: '', city: '', country: '' },
        inventory: []
    };
    private _selectedDealership: BehaviorSubject<IDealership> = new BehaviorSubject<IDealership>(this._nullDealership);
    public selectedDealership$: Observable<IDealership> = this._selectedDealership.asObservable();
    private _dealerships: BehaviorSubject<IDealership[]> = new BehaviorSubject<IDealership[]>([]);
    public dealerships$: Observable<IDealership[]> = this._dealerships.asObservable();
    public subs: Subscription[] = [];
    constructor(private iService: InventoryService) {
        this.loadDealerships();
    }

    loadDealerships(): void {
        const dealerships: IDealership[] = data.dealerships;
        const seldel = this.selectedDealership$.subscribe((dealership) => {
            this.iService.loadInventory(dealership.id);
        });
        dealerships.map((dealer) => (dealer.inventory = this.iService.getVehicleInventory(dealer.id)));
        this._dealerships.next(dealerships);
        this.subs.push(seldel);
    }

    selectDealership(id: number): void {
        const del = this.dealerships$.subscribe((dealerships) => {
            const sel = dealerships.find((deal) => deal.id == id);
            if (sel !== undefined) {
                this._selectedDealership.next(sel);
            } else {
                this._selectedDealership.next(this._nullDealership);
            }
        });
        this.subs.push(del);
    }

    getDealershipInventory(): void {
        const seldel = combineLatest(this.selectedDealership$, this.iService.inventory$)
            .pipe(
                map((data) => {
                    return { selectedDealership: data[0], inventory: data[1] };
                })
            )
            .subscribe((data) => {
                data.selectedDealership.inventory = [...data.inventory.newVehicles, ...data.inventory.usedVehicles];
            });
        this.subs.push(seldel);
    }

    ngOnDestroy() {
        this.subs.forEach((subscription) => subscription.unsubscribe());
    }
}
