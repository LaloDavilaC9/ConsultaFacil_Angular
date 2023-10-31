import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginPacienteComponent } from './login-paciente/login-paciente.component';
import { LoginConsultorioComponent } from './login-consultorio/login-consultorio.component';
import { SignupPacienteComponent } from './signup-paciente/signup-paciente.component';
import { SignupConsultorioComponent } from './signup-consultorio/signup-consultorio.component';
import { BrowserComponent } from './browser/browser.component';
import { DetailsComponent } from './details/details.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { RecordComponent } from './record/record.component';
import { DiaryComponent } from './diary/diary.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TeamComponent } from './team/team.component';
import { AdvertisingComponent } from './advertising/advertising.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [

  {path:'home', component: HomeComponent},
  {path:'loginPaciente', component: LoginPacienteComponent},
  {path:'loginConsultorio', component: LoginConsultorioComponent},
  {path:'signUpPaciente', component: SignupPacienteComponent},
  {path:'signUpConsultorio', component: SignupConsultorioComponent},
  {path:'browser', component: BrowserComponent},
  {path:'details', component: DetailsComponent},
  {path:'controlPanel', component: ControlPanelComponent},
  {path:'record', component: RecordComponent},
  {path:'diary', component: DiaryComponent},
  {path:'statistics', component: StatisticsComponent},
  {path:'team', component: TeamComponent},
  {path:'advertising', component: AdvertisingComponent},
  {path:'support', component: SupportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
