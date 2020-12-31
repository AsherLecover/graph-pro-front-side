import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { PatientsService } from '../../servises/patients.service'
import { MedicalMainDataModel } from '../../models/medical-main-data-model'
import { FormBuilder, Validators } from '@angular/forms';

@Component({

  selector: 'patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  PatientList: Observable<any>

  madicalsParams: string[] = [
    'MovementFast',
    'MovementSlow',
    'ObjectDistance',
    'State',
    'algorithm_state',
    'average_apnea',
    'cartridge_is_replace',
    'level_one_start_time',
    'level_three_start_time',
    'need_to_testing_third_level',
    'predict',
    'relaxed',
    'rpm',
    'rpm_average',
    'short_rpm_average',
    'signal_quality',
    'user_id'
  ];
  patientId: any;
  param: any;
  myForm: any;
  dateTest: any;




  constructor(
    private patientsService: PatientsService,
    private fb: FormBuilder) {
    this.PatientList = this.patientsService.getAllPatients()


  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      slelectPatien: [Validators.required],
      slelectParam: [Validators.required],
      dateOfPatien: [new Date('2020-12-20').toISOString().split('T')[0], Validators.required]
    });
  }

  selectPatient(event: any) {
    console.log('event:', event.target.value);
    this.getUserMedicalData(event.target.value)
  }

  getUserMedicalData(patientId) {
    this.patientId = patientId;
    this.patientsService.getUserMedicalData(patientId).subscribe(data => {
      console.log('MedicalData:: ', data);
    })
  }

  selectParam(event) {
    this.param = event.target.value
    console.log('event:', event.target.value);
  }

  sendReq() {
    console.log(425245245);
    console.log(this.myForm.value.dateOfPatien);
    
    this.patientsService.getUserMedicalDataByParam(this.patientId, this.param,this.myForm.value.dateOfPatien).subscribe(data => {
      console.log(data);
      this.dateTest = this.myForm.value.dateOfPatien
      
      

    })
  }

  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
}

 

}
