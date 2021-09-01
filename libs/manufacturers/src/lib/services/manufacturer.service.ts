import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IManufacturer } from '../models/manufacturer';

@Injectable({
    providedIn: 'root'
})
export class ManufacturerService {
    private _manufacturers: BehaviorSubject<IManufacturer[]> = new BehaviorSubject<IManufacturer[]>(null);
    public manufacturers$: Observable<IManufacturer[]> = this._manufacturers.asObservable();
    constructor() {}
}
