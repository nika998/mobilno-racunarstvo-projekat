import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/patients/patient.model';

@Component({
  selector: 'app-patient-element',
  templateUrl: './patient-element.component.html',
  styleUrls: ['./patient-element.component.scss'],
})
export class PatientElementComponent implements OnInit {

  @Input() patient: Patient;

  constructor() { }

  ngOnInit() {
  }

}
