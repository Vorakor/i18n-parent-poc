import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AudiComponent } from './components/audi/audi.component';
import { HondaComponent } from './components/honda/honda.component';
import { AcuraComponent } from './components/acura/acura.component';
import { VolkswagenComponent } from './components/volkswagen/volkswagen.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: HomeComponent }])],
    declarations: [HomeComponent, AudiComponent, HondaComponent, AcuraComponent, VolkswagenComponent]
})
export class ManufacturersModule {}
