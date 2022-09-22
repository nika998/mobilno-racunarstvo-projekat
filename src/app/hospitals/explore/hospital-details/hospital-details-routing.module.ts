import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospitalDetailsPage } from './hospital-details.page';

const routes: Routes = [
  {
    path: '',
    component: HospitalDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalDetailsPageRoutingModule {}
