import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginConsultorioComponent } from './login-consultorio/login-consultorio.component';
import { SignupConsultorioComponent } from './signup-consultorio/signup-consultorio.component';
import { SupportComponent } from './support/support.component';
import { HomeComponent } from './home/home.component';
import { LoginPacienteComponent } from './login-paciente/login-paciente.component';
import { SignupPacienteComponent } from './signup-paciente/signup-paciente.component';
import { AdvertisingComponent } from './advertising/advertising.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecordComponent } from './record/record.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TeamComponent } from './team/team.component';
import { FormsModule } from '@angular/forms';
import { RecordPacienteComponent } from './record-paciente/record-paciente.component';
import { BrowserComponent } from './browser/browser.component';
import { DetailsComponent } from './details/details.component';
import { DiaryComponent } from './diary/diary.component';
import { LayoutComponent } from './layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginConsultorioComponent,
    SignupConsultorioComponent,
    SupportComponent,
    HomeComponent,
    LoginPacienteComponent,
    SignupPacienteComponent,
    AdvertisingComponent,
    ControlPanelComponent,
    RecordComponent,
    StatisticsComponent,
    TeamComponent,
    BrowserComponent,
    DetailsComponent,
    DiaryComponent,
    LayoutComponent,
    RecordPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
