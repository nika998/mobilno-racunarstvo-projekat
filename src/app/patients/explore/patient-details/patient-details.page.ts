import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HospitalsService } from 'src/app/hospitals/hospitals.service';
import { Patient } from '../../patient.model';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {

  patient: Patient;

  constructor(private route: ActivatedRoute, private hospitalsService: HospitalsService, private navCtrl: NavController,
             ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('patientId')) {
        this.navCtrl.navigateBack('/patients/tabs/explore');
        return;
      }

      this.hospitalsService
        .getPatient(paramMap.get('patientId')).subscribe((patient) => {
          console.log(patient.gender)
          this.patient = patient;
        })

    });

  }


}
