import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { HospitalModalComponent } from '../../hospital-modal/hospital-modal.component';
import { Hospital } from '../../hospital.model';
import { HospitalsService } from '../../hospitals.service';
import { PatientModalComponent } from '../../patient-modal/patient-modal.component';
import { Patient } from '../../../patients/patient.model';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.page.html',
  styleUrls: ['./hospital-details.page.scss'],
})
export class HospitalDetailsPage implements OnInit {

  hospital: Hospital;
  isLoading = false;

  constructor(private route: ActivatedRoute, private hospitalsService: HospitalsService, private navCtrl: NavController,
              private loadingCtrl: LoadingController, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('hospitalId')) {
        this.navCtrl.navigateBack('/hospitals/tabs/explore');
        return;
      }

      this.hospitalsService
        .getHospital(paramMap.get('hospitalId'))
        .subscribe((hospital) => {
          this.hospital = hospital;
          if(typeof this.hospital.patients === 'undefined') this.hospital.patients = [];
        });
    });

  }

  onDeleteHospital() {
    this.loadingCtrl.create({message: 'Deleting...'}).then(loadingEl => {
      loadingEl.present();
      this.hospitalsService.deleteHospital(this.hospital.id).subscribe(() => {        
        this.navCtrl.navigateBack('/hospitals/tabs/explore');
        loadingEl.dismiss();
      });
    });
  }

  onEditHospital() {
    this.modalCtrl
      .create({
        component: HospitalModalComponent,
        componentProps: {title: 'Edit hospital', name: this.hospital.name, address: this.hospital.address, email: this.hospital.email, phone: this.hospital.phone, imageUrl: this.hospital.imageUrl },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({message: 'Editing...'})
            .then((loadingEl) => {
              loadingEl.present();
              this.hospitalsService
                .editHospital(
                  this.hospital.id,
                  resultData.data.hospitalData.name,
                  resultData.data.hospitalData.address,
                  resultData.data.hospitalData.email,
                  resultData.data.hospitalData.phone,
                  resultData.data.hospitalData.imageUrl,
                  this.hospital.patients,
                  this.hospital.userId
                )
                .subscribe((hospitals) => {
                  this.hospital.name = resultData.data.hospitalData.name;
                  this.hospital.address = resultData.data.hospitalData.address;
                  this.hospital.email = resultData.data.hospitalData.email;
                  this.hospital.phone = resultData.data.hospitalData.phone;
                  this.hospital.imageUrl = resultData.data.hospitalData.imageUrl;
                  loadingEl.dismiss();
                });
            });
        }
      });
  }

  onAddPatient() {
    this.modalCtrl
      .create({
        component: PatientModalComponent,
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({message: 'Adding patient...'})
            .then((loadingEl) => {
              loadingEl.present();
              let newPatient = new Patient(
                resultData.data.patientData.id,
                resultData.data.patientData.name,
                resultData.data.patientData.surname,
                resultData.data.patientData.address,
                resultData.data.patientData.phone,
                resultData.data.patientData.gender,
                this.hospital.userId  
              ) 
              if(typeof this.hospital.patients === 'undefined') this.hospital.patients = []
        
              this.hospital.patients.push(newPatient);
              loadingEl.dismiss();
              this.onEditHospital()
            });

        }
      });
  }

}
