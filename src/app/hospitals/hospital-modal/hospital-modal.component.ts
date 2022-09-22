import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Patient } from '../../patients/patient.model';

@Component({
  selector: 'app-hospital-modal',
  templateUrl: './hospital-modal.component.html',
  styleUrls: ['./hospital-modal.component.scss'],
})
export class HospitalModalComponent implements OnInit {

  @Input() title: string;
  @Input() name: string;
  @Input() address: string;
  @Input() email: string;
  @Input() phone: string;
  @Input() imageUrl: string;
  @Input() patients: Patient[];
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddHospital() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        hospitalData: {
          name: this.form.value.name,
          address: this.form.value.address,
          email: this.form.value.email,
          phone: this.form.value.phone,
          imageUrl: this.form.value.imageUrl,
          patients: []
        }
      },
      'confirm'
    );
  }

}
