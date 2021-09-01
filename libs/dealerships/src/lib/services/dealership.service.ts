import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDealership } from '../models/dealership';
import * as data from '../data/dealership.json';

@Injectable({
    providedIn: 'root'
})
export class DealershipService {
    private _dealerships: BehaviorSubject<IDealership[]> = new BehaviorSubject<IDealership[]>(null);
    public dealerships$: Observable<IDealership[]> = this._dealerships.asObservable();
    constructor() {}

    loadDealerships(): void {
        this._dealerships.next(data.dealerships);
    }
}
