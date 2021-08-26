import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDealership } from '../models/dealership';

@Injectable({
    providedIn: 'root'
})
export class DealershipService {
    private _dealerships: BehaviorSubject<IDealership[]> = new BehaviorSubject<IDealership[]>(null);
    public $dealerships: Observable<IDealership[]> = this._dealerships.asObservable();
    constructor() {}

    loadDealerships(): void {
        let newD: IDealership, usedD: IDealership, newUsedD: IDealership;
        this._dealerships.next([newD, usedD, newUsedD]);
    }
}
