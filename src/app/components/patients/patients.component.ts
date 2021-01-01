import { Component, Inject, OnInit, ViewChild, ElementRef , ChangeDetectorRef} from '@angular/core';
import { from, Observable } from 'rxjs';
import { PatientsService } from '../../servises/patients.service'
import { MedicalMainDataModel } from '../../models/medical-main-data-model'
import { FormBuilder, Validators } from '@angular/forms';
import * as Plotly from 'plotly.js/dist/plotly.js';



@Component({

  selector: 'patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],

})
export class PatientsComponent implements OnInit {
  param: string = '';

  @ViewChild('chart') chart:ElementRef;

  graphData = [{ x: [], y: [], type: 'line' }];

  public graphRpm = {
    data: this.graphData,
    layout: { 
      hovermode:'closest',
      title:'<br> click on a point to plot an annotation',
      xaxis:{zeroline:false, title: 'Time'},
      yaxis:{zeroline:false, title: `${this.param}`}
   }
  };



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

  patientId: string = '';
  myForm: any;
  dateTest: any;
  disableBtn: boolean = true;

  constructor(
    private patientsService: PatientsService,
    private fb: FormBuilder) {
    this.PatientList = this.patientsService.getAllPatients()


  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      dateOfPatien: ['', Validators.required]
    });
  }

  selectPatient(event: any) {
    this.patientId = event.target.value;
    if(this.patientId != '' && this.param != '' && this.myForm.valid){
      this.disableBtn = false;
    }
  }

  chackFormValid(e){
    if(this.patientId != '' && this.param != '' && this.myForm.valid){
      this.disableBtn = false;
    }
  }



  selectParam(event) {
    this.param = event.target.value;
    console.log(event.target.value);
    
    if(this.patientId != '' && this.param != '' && this.myForm.valid){
      this.disableBtn = false;
    }
  }

  sendReq() {
        const elemenGraph = this.chart.nativeElement;
          Plotly.newPlot(elemenGraph, this.graphData);

    this.patientsService.getUserMedicalDataByParam(this.patientId, this.param,this.myForm.value.dateOfPatien)
    .subscribe( (data: MedicalMainDataModel[]) => {
      data.forEach( e => {
        this.graphData[0].x.push(e['TimeStamp'])
        this.graphData[0].y.push(e[this.param.toString()])
        
      })
      Plotly.redraw(elemenGraph, this.graphData);
      console.log(this.graphData);
      
      this.dateTest = this.myForm.value.dateOfPatien;
    })

  }

 
 

}
