import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HospitalModalComponent } from '../hospital-modal/hospital-modal.component';
import { Hospital } from '../hospital.model';
import { HospitalsService } from '../hospitals.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  hospitals: Hospital[];

  private hospitalSub: Subscription;

  constructor(private menuCtrl: MenuController, private hospitalsService: HospitalsService, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.hospitalSub = this.hospitalsService.hospitals.subscribe((hospitals) => {
      this.hospitals = hospitals;
    });

  }

  ionViewWillEnter() {
    this.hospitalsService.getHospitals().subscribe((hospitals) => {
      //this.hospitals = hospitals;
    });
  }

  openMenu() {
    this.menuCtrl.open();
  }

  openModal() {
    this.modalCtrl
      .create({
        component: HospitalModalComponent,
        componentProps: { title: 'Add hospital' }
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      }).then((resultData) => {
        if (resultData.role === 'confirm') {
          this.hospitalsService.addHospital(resultData.data.hospitalData.name, resultData.data.hospitalData.address, resultData.data.hospitalData.email, resultData.data.hospitalData.phone, resultData.data.hospitalData.imageUrl, resultData.data.hospitalData.patients).subscribe((hospitals) => {
            //this.hospitals = hospitals;
          });
        }
      });
  }

  ngOnDestroy() {
    if (this.hospitalSub) {
      this.hospitalSub.unsubscribe();
    }
  }

}
