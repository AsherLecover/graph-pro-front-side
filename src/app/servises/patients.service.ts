import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PatientsService {




  constructor(private http: HttpClient) { }

  getAllPatients() {
    return this.http.get(`${environment.apiUrl}/patients`)
  }

  

  getUserMedicalDataByParam(patientId, param, date) {
    return this.http.get(`${environment.apiUrl}/main-data/${patientId}/${param}/${date}`)

  }
}
