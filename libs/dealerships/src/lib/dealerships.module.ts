import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './components/home/home.component';
import { NewComponent } from './components/new/new.component';
import { UsedComponent } from './components/used/used.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: HomeComponent }]), TranslateModule],
    declarations: [HomeComponent, NewComponent, UsedComponent]
})
export class DealershipsModule {}
