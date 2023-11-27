import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AdvertisingComponent } from './advertising/advertising.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { BrowserComponent } from './browser/browser.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DetailsComponent } from './details/details.component';
import { DiaryComponent } from './diary/diary.component';
import { HomeComponent } from './home/home.component';
import { LoginConsultorioComponent } from './login-consultorio/login-consultorio.component';
import { LoginPacienteComponent } from './login-paciente/login-paciente.component';
import { RecordComponent } from './record/record.component';
import { RecordPacienteComponent } from './record-paciente/record-paciente.component';
import { SignupConsultorioComponent } from './signup-consultorio/signup-consultorio.component';
import { SignupPacienteComponent } from './signup-paciente/signup-paciente.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SupportComponent } from './support/support.component';
import { TeamComponent } from './team/team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdvertisingComponent,
    HeaderComponent,
    BrowserComponent,
    ControlPanelComponent,
    DetailsComponent,
    DiaryComponent,
    HomeComponent,
    LoginConsultorioComponent,
    LoginPacienteComponent,
    RecordComponent,
    RecordPacienteComponent,
    SignupConsultorioComponent,
    SignupPacienteComponent,
    StatisticsComponent,
    SupportComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
