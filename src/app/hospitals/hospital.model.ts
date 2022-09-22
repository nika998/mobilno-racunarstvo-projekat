import { Patient } from "../patients/patient.model";

export class Hospital {

  constructor(public id: string, public name: string, public address: string, public phone: string, public email: string, public imageUrl: string, public patients: Patient[], public userId: string) {

  }
    
}
