import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HedderComponent } from './components/hedder/hedder.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientsComponent } from './components/patients/patients.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { PatientsDetailsComponent } from './components/patients-details/patients-details.component';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';

PlotlyModule.plotlyjs = PlotlyJS;







@NgModule({
  declarations: [
    AppComponent,
    HedderComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    PatientsComponent,
    PatientsDetailsComponent,
    WorkInProgressComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PlotlyModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
