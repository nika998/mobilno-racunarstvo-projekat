import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HospitalsService } from 'src/app/hospitals/hospitals.service';
import { Patient } from 'src/app/patients/patient.model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  patients: Patient[] = [];
  
  private patientSub: Subscription;
  

  constructor(private menuCtrl: MenuController, private hospitalsService: HospitalsService) {

   }

  ngOnInit() {
    this.patientSub = this.hospitalsService.patients.subscribe((patients) => {
      this.patients = patients;
    })
    
  }

  ionViewWillEnter() {
    this.hospitalsService.getPatients().subscribe((hospitals) => {
      //this.hospitals = hospitals;
    });
  }

  openMenu() {
    this.menuCtrl.open();
  }

  ngOnDestroy() {
    if (this.patientSub) {
      this.patientSub.unsubscribe();
    }
  }

}
