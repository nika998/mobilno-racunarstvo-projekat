import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Hospital } from '../hospital.model';
import { HospitalsService } from '../hospitals.service';



@Component({
  selector: 'app-hospital-element',
  templateUrl: './hospital-element.component.html',
  styleUrls: ['./hospital-element.component.scss'],
})
export class HospitalElementComponent implements OnInit {
  @Input() hospital: Hospital = { id: 'ORG-003', name: 'Hospital3', address: 'Address 3', phone: '333-333', email: 'hospital3@gmail.com', imageUrl: '', patients: [], userId: '' };

  constructor(private alertCtrl: AlertController, private hospitalService: HospitalsService) { }

  ngOnInit() { }

  addFavourites(data) {
    this.hospitalService.tiggerFavouritesList(data);
  }

  onOpenAlert(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.alertCtrl.create({
      header: 'Saving...',
      message: 'Are you sure you want to save this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Save',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.addFavourites(this.hospital);
          }
        }
      ]
    }).then(a => {
      a.present();
    });
  }

}
