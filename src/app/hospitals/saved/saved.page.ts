import { Component, OnInit } from '@angular/core';
import { Hospital } from '../hospital.model';
import { HospitalsService } from '../hospitals.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {

  savedHospitals: Hospital[] = [];

  constructor(private hospitalService: HospitalsService) { }

  ngOnInit() {
    this.hospitalService.savedHospitals.subscribe(
      response =>{
       this.savedHospitals = response;
      }
    );
  }

  ngOnDestroy() {
    this.savedHospitals = null;
  }

  

}
