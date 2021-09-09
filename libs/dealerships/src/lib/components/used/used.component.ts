import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '@child-poc/shared';
import { IDealership } from '../../models/dealership';

@Component({
    selector: 'used',
    templateUrl: './used.component.html',
    styleUrls: ['./used.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsedComponent {
    @Input() dealerships: IDealership[] | null = [];
    constructor(private route: Router, private inventory: InventoryService) {}

    seeInventory(dealershipid: number) {
        // this.inventory.loadInventory(dealershipid);
        this.inventory.setDealership(dealershipid);
        this.route.navigate(['inventory']);
    }
}
