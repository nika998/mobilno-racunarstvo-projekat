import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-patient-modal',
  templateUrl: './patient-modal.component.html',
  styleUrls: ['./patient-modal.component.scss'],
})
export class PatientModalComponent implements OnInit {
  
  @Input() id: string;
  @Input() name: string;
  @Input() surname: string;
  @Input() address: string;
  @Input() phone: string;
  @Input() gender: string;
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddPatient() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        patientData: {
          id: this.form.value.id,
          name: this.form.value.name,
          surname: this.form.value.surname,
          address: this.form.value.address,
          phone: this.form.value.phone,
          gender: this.form.value.gender,
        }
      },
      'confirm'
    );
  }

}
