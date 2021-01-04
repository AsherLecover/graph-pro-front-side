import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientsService } from 'src/app/servises/patients.service';

@Component({
  selector: 'patients-details',
  templateUrl: './patients-details.component.html',
  styleUrls: ['./patients-details.component.css']
})
export class PatientsDetailsComponent implements OnInit {
  PatientList: Observable<any>;


  constructor( private patientsService: PatientsService) {
    this.PatientList = this.patientsService.getAllPatients();

   }

  ngOnInit(): void {
  }

}
