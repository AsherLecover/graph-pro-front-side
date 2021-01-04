import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { from, Observable } from 'rxjs';
import { PatientsService } from '../../servises/patients.service';
import { MedicalMainDataModel } from '../../models/medical-main-data-model';
import { PatientsModel } from '../../models/patients-model';
import { FormBuilder, Validators } from '@angular/forms';
import * as Plotly from 'plotly.js/dist/plotly.js';
import { PatientsGuardService } from 'src/app/guard/patients-guard.service';

@Component({
  selector: 'patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  layoutGraph = {
    title: {
      text:'',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    hovermode: 'closest',
    text:'Plot Title',
    xaxis: { title: 'Date ' },
    yaxis: { title: '' },
  };

  param: string = '';

  @ViewChild('chart') chart: ElementRef;
  @ViewChild('chartSecond') chartSecond: ElementRef;
  @ViewChild('myDiv') myDiv: ElementRef;



  graphData = [{ x: [], y: [], name: '', type: 'line' }];
  graphDataSecondGraph = [{ x: [], y: [], name: '', type: 'line' }];

  PatientList: Observable<any>;
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
  ];

  patientId: string = '';
  myForm: any;
  disableBtn: boolean = true;
  elemenGraph
  showGraphSelected: boolean = false;
  showPatientCardDetails: boolean = false;
  
  // elemenGraph = this.chart.nativeElement;



  constructor(
    private patientsService: PatientsService,
    private fb: FormBuilder,
    private patientsGuardService: PatientsGuardService
  ) {
    this.PatientList = this.patientsService.getAllPatients();
    console.log(this.patientsGuardService.canRouteToPatiensPage);
    

    if(localStorage.getItem('accessToken')){
      this.patientsGuardService.canRouteToPatiensPage = true;
      console.log(this.patientsGuardService.canRouteToPatiensPage);

    }
  }

  ngOnInit(): void {
    
  
  

    this.myForm = this.fb.group({
      dateOfPatien: ['', Validators.required]
    });
  }

  selectPatient(event: any) {
    this.PatientList.subscribe( (data:PatientsModel[]) => {
      console.log(data);
      this.layoutGraph.title.text = data.find( atient => atient.id ==  event.target.value).username;

      
    })
    this.patientId = event.target.value;
    console.log(event);
    
    if (this.patientId != '' && this.param != '' && this.myForm.valid) {
      this.disableBtn = false;
    }
  }

  chackFormValid(e) {
    if (this.patientId != '' && this.param != '' && this.myForm.valid) {
      this.disableBtn = false;
    }
  }

  selectParam(event) {
    this.param = event.target.value;
    console.log(event.target.value);

    if (this.patientId != '' && this.param != '' && this.myForm.valid) {
      this.disableBtn = false;
    }
  }

  sendReq() {
    this.showGraphSelected = true;
    console.log(this.showGraphSelected);
    
    this.layoutGraph.yaxis.title = this.param;
    this.elemenGraph = this.chart.nativeElement;
    Plotly.newPlot(this.elemenGraph, this.graphData, this.layoutGraph);

    this.patientsService
      .getUserMedicalDataByParam(
        this.patientId,
        this.param,
        this.myForm.value.dateOfPatien
      )
      .subscribe((data: MedicalMainDataModel[]) => {
        data.forEach((e) => {
          this.graphData[0].x.push(e['TimeStamp']);
          this.graphData[0].y.push(e[this.param.toString()]);
          this.graphData[0].name = this.param;
        });
        Plotly.redraw(this.elemenGraph, this.graphData, this.layoutGraph);

      });
  }

  sendReqOnNewGraph() {
    this.layoutGraph.yaxis.title = this.param;
    this.elemenGraph = this.chartSecond.nativeElement;
    Plotly.newPlot(this.elemenGraph, this.graphDataSecondGraph, this.layoutGraph);

    this.patientsService
      .getUserMedicalDataByParam(
        this.patientId,
        this.param,
        this.myForm.value.dateOfPatien
      )
      .subscribe((data: MedicalMainDataModel[]) => {
        data.forEach((e) => {
          this.graphDataSecondGraph[0].x.push(e['TimeStamp']);
          this.graphDataSecondGraph[0].y.push(e[this.param.toString()]);
          this.graphDataSecondGraph[0].name = this.param;
        });
        Plotly.redraw(this.elemenGraph, this.graphDataSecondGraph, this.layoutGraph);
        console.log(this.graphDataSecondGraph);

      });
  }

  sendReqOnExistsGraph(){
    this.layoutGraph.yaxis.title = this.param;
    let data = [this.graphData[0],this.graphDataSecondGraph[0]]
    Plotly.newPlot(this.elemenGraph, data, this.layoutGraph);

    this.patientsService
      .getUserMedicalDataByParam(
        this.patientId,
        this.param,
        this.myForm.value.dateOfPatien
      )
      .subscribe((data: MedicalMainDataModel[]) => {
        data.forEach((e) => {
          this.graphDataSecondGraph[0].x.push(e['TimeStamp']);
          this.graphDataSecondGraph[0].y.push(e[this.param.toString()]);
          this.graphDataSecondGraph[0].name = this.param;
        });
        Plotly.redraw(this.elemenGraph,data, this.layoutGraph);
        console.log(this.graphDataSecondGraph);
      });
  }

  
  

  PatientCardDetails(){
    this.showPatientCardDetails = !this.showPatientCardDetails;
  }

 

 


}
