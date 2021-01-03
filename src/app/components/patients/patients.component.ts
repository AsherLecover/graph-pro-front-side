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
   firstPlotTrace = {
    x: [1,2,3,4],
    y: [1,2,3,4],
    type: 'contour',
    name: 'yaxis data'
};

 secondPlotTrace = {
    x: [4,15,26,37],
    y: [14,25,36,57],
    mode: 'lines+markers',
    name: 'yaxis2 data'
};

 plotData = [this.firstPlotTrace, this.secondPlotTrace];

 layout = {
    title: 'Double Plot Title',
    height: 400,
    width: 400,
    yaxis: {title: 'Simple Contour Plot Axis', range: [-20, 20]},
    yaxis2: {title: 'Line and Scatter Plot Axis', range: [-20, 20]}
};


  param: string = '';

  @ViewChild('chart') chart:ElementRef;
  @ViewChild('plotDiv') plotDiv:ElementRef;


  graphData = [{ x: [], y: [], type: 'line' }];

  graphDataTest = [{ x: [1,2,3,4,5], y: [1,2,3,4,5], type: 'line' }];


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
    Plotly.newPlot('plotDiv', this.plotData, this.layout);


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
        let arr = [this.graphData ,this.graphDataTest]
          Plotly.newPlot(elemenGraph, this.graphDataTest);

    this.patientsService.getUserMedicalDataByParam(this.patientId, this.param,this.myForm.value.dateOfPatien)
    .subscribe( (data: MedicalMainDataModel[]) => {
      data.forEach( e => {
        this.graphData[0].x.push(e['TimeStamp'])
        this.graphData[0].y.push(e[this.param.toString()])
        
      })
      arr = [this.graphData ,this.graphDataTest]
      Plotly.newPlot(elemenGraph, arr);
      console.log(this.graphData);
      
      this.dateTest = this.myForm.value.dateOfPatien;
    })

  }

  newParamOnThisGraph(){

  }

 
 

}
