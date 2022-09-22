import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Hospital } from '../hospital.model';
import { HospitalsService } from '../hospitals.service';

@Component({
  selector: 'app-hospital-saved-element',
  templateUrl: './hospital-saved-element.component.html',
  styleUrls: ['./hospital-saved-element.component.scss'],
})
export class HospitalSavedElementComponent implements OnInit {

  @Input() hospital: Hospital = { id: 'ORG-003', name: 'Hospital3', address: 'Address 3', phone: '333-333', email: 'hospital3@gmail.com', imageUrl: '', patients: [], userId: '' };

  constructor(private alertCtrl: AlertController, private hospitalService: HospitalsService) { }

  ngOnInit() { }

  deleteFavourite(data) {
    this.hospitalService.deleteFromFavouritesList(data);
  }

  onOpenAlert(event: Event) {

    event.stopPropagation();
    event.preventDefault();

    this.alertCtrl.create({
      header: 'Removing...',
      message: 'Are you sure you want to remove this from favourites?',
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
          text: 'Remove',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteFavourite(this.hospital);
          }
        }
      ]
    }).then(a => {
      a.present();
    });
  }

}
