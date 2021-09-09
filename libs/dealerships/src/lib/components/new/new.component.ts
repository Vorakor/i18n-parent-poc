import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '@child-poc/shared';
import { IDealership } from '../../models/dealership';

@Component({
    selector: 'new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewComponent {
    @Input() dealerships: IDealership[] | null = [];
    constructor(private route: Router, private inventory: InventoryService) {}

    seeInventory(dealershipid: number) {
        // this.inventory.loadInventory(dealershipid);
        this.inventory.setDealership(dealershipid);
        this.route.navigate(['inventory']);
    }
}
