import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { HospitalElementComponent } from "../hospital-element/HospitalElementComponent.1";
import { HospitalModalComponent } from '../hospital-modal/hospital-modal.component';
import { PatientModalComponent } from '../patient-modal/patient-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule
  ],
  declarations: [ExplorePage, HospitalElementComponent, HospitalModalComponent, PatientModalComponent],
  entryComponents: [HospitalModalComponent]
})
export class ExplorePageModule {}
