import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { PatientsService} from '../../servises/patients.service'

@Component({
  selector: 'patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  PatientList

  constructor(private patientsService: PatientsService) { 
    this.PatientList =  this.patientsService.getAllPatients()
  
    
  }

  ngOnInit(): void {
  }

  selectPatient(event: any){
    console.log('event:', event.target.value);
    this.getUserMedicalData(event.target.value)
  }

  getUserMedicalData(patientId){
    this.patientsService.getUserMedicalData(patientId).subscribe( data => {
      console.log('1212121212');
      
      console.log('MedicalData:: ',data);
      
    })
  }

}
