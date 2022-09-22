import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HospitalsPageRoutingModule } from './hospitals-routing.module';

import { HospitalsPage } from './hospitals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HospitalsPageRoutingModule
  ],
  declarations: [HospitalsPage]
})
export class HospitalsPageModule {}
