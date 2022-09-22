import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from './hospital.model';
import { map, switchMap, tap, take } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Patient } from '../patients/patient.model';

interface HospitalData {
  name: string;
  address: string;
  email: string;
  phone: string;
  userId: string;
  imageUrl: string;
  patients: Patient[];
}

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {
  private _hospitals = new BehaviorSubject<Hospital[]>([]);
  private _patients = new BehaviorSubject<Patient[]>([]);
  private _savedHospitals = new BehaviorSubject<Hospital[]>([]);

  private favourites: Hospital[] = [];

  get patients() {
    return this._patients.asObservable();

  }

  get savedHospitals() {
    return this._savedHospitals.asObservable();

  }

  get hospitals() {
    return this._hospitals.asObservable();

  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  addHospital(name: string, address: string, email: string, phone: string, imageUrl: string, patients: Patient[]) {
    let generatedId;
    let newHospital: Hospital;
    let fetchedUserId: string;

    return this.authService.userId.pipe(take(1), switchMap(userId => {
      fetchedUserId = userId;
      return this.authService.token;
    }),
      take(1),
      switchMap((token) => {
        newHospital = new Hospital(null, name, address, phone, email, imageUrl, patients, fetchedUserId);

        return this.http
          .post<{ name: string }>(
            `https://healthcare-project-mr-default-rtdb.europe-west1.firebasedatabase.app/hospitals.json?auth=${token}`, newHospital)

      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.hospitals;
      }),
      take(1),
      tap((hospitals) => {
        newHospital.id = generatedId;
        let newHospitalsArray = hospitals.concat(newHospital);
        this._hospitals.next(newHospitalsArray);

      })
    );

  }

  getPatients() {

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: HospitalData }>(
            `https://healthcare-project-mr-default-rtdb.europe-west1.firebasedatabase.app/hospitals.json?auth=${token}`
          );
      }),
      map((hospitalsData) => {

        let patients: Patient[] = [];
        for (const key in hospitalsData) {
          if (hospitalsData.hasOwnProperty(key)) {
            const hospitalFromDB = new Hospital(key, hospitalsData[key].name, hospitalsData[key].address, hospitalsData[key].phone, hospitalsData[key].email, hospitalsData[key].imageUrl, hospitalsData[key].patients, hospitalsData[key].userId)
            if (typeof hospitalFromDB.patients !== 'undefined') {
              patients = patients.concat(hospitalFromDB.patients);
            }
          }
        }
        return patients;
      }),
      tap(patients => {
        this._patients.next(patients);
      })
    );

  }

  getHospitals() {

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: HospitalData }>(
            `https://healthcare-project-mr-default-rtdb.europe-west1.firebasedatabase.app/hospitals.json?auth=${token}`
          );
      }),
      map((hospitalsData) => {
        const hospitals: Hospital[] = [];
        for (const key in hospitalsData) {
          if (hospitalsData.hasOwnProperty(key)) {
            hospitals.push(new Hospital(key, hospitalsData[key].name, hospitalsData[key].address, hospitalsData[key].phone, hospitalsData[key].email, hospitalsData[key].imageUrl, hospitalsData[key].patients, hospitalsData[key].userId)
            );
          }
        }
        return hospitals;
      }),
      tap(hospitals => {
        this._hospitals.next(hospitals);
      })
    );

  }

  getHospital(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<HospitalData>(
          `https://healthcare-project-mr-default-rtdb.europe-west1.firebasedatabase.app/hospitals/${id}.json?auth=${token}`
        );
      }),
      map((resData: HospitalData) => {
        return new Hospital(
          id,
          resData.name,
          resData.address,
          resData.phone,
          resData.email,
          resData.imageUrl,
          resData.patients,
          resData.userId
        );
      })
    );
  }

  getPatient(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: HospitalData }>(
            `https://healthcare-project-mr-default-rtdb.europe-west1.firebasedatabase.app/hospitals.json?auth=${token}`
          );
      }),
      map((hospitalsData) => {

        let patients: Patient[] = [];
        for (const key in hospitalsData) {
          if (hospitalsData.hasOwnProperty(key)) {
            const hospitalFromDB = new Hospital(key, hospitalsData[key].name, hospitalsData[key].address, hospitalsData[key].phone, hospitalsData[key].email, hospitalsData[key].imageUrl, hospitalsData[key].patients, hospitalsData[key].userId)
            if (typeof hospitalFromDB.patients !== 'undefined') {
              patients = patients.concat(hospitalFromDB.patients);
            }
          }
        }
        const patient = patients.find(pat => pat.id === id);
        return patient;
      })
    );
  }

  editHospital(
    id: string,
    name: string,
    address: string,
    email: string,
    phone: string,
    imageUrl: string,
    patients: Patient[],
    userId: string
  ) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(
          `https://healthcare-project-mr-default-rtdb.europe-west1.firebasedatabase.app/hospitals/${id}.json?auth=${token}`,
          {
            name,
            address,
            email,
            phone,
            imageUrl,
            patients,
            userId,
          }
        );
      }),
      switchMap(() => {
        return this.hospitals;
      }),
      take(1),
      tap((hospitals) => {
        const updatedHospialIndex = hospitals.findIndex((h) => h.id === id);
        const updatedHospitals = [...hospitals];
        updatedHospitals[updatedHospialIndex] = new Hospital(
          id,
          name,
          address,
          phone,
          email,
          imageUrl,
          patients,
          userId
        );
        this._hospitals.next(updatedHospitals);
      })
    );
  }

  deleteHospital(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://healthcare-project-mr-default-rtdb.europe-west1.firebasedatabase.app/hospitals/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.hospitals;
      }),
      take(1),
      tap((hospitals) => {
        this._hospitals.next(hospitals.filter((h) => h.id !== id));
      })
    );
  }

  tiggerFavouritesList(data) {
    if (!this.containsObject(data,this.favourites)) this.favourites.push(data)
    this._savedHospitals.next(this.favourites);
  }

  deleteFromFavouritesList(data) {
    this.removeHospitalFromArray(this.favourites, data);
    this._savedHospitals.next(this.favourites);

  }

  removeHospitalFromArray(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }

  }

  containsObject(obj, arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }

    return false;
}
}
