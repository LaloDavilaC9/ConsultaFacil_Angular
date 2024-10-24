import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct,  } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../app/services/ApiService'
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
 
})
export class ControlPanelComponent implements OnInit {
  model: NgbDateStruct | undefined;
  selectedDate: Date| undefined;
  fechaActual: String  = "";

  
  citasDeHoy : any[] = []
  tituloTabla : String = "PACIENTES DE HOY";
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const fecha = new Date();
    // Formatear la fecha en el formato AAAA-MM-DD
    this.fechaActual = formatDate(fecha, 'yyyy-MM-dd', 'en-US');
    console.log(this.fechaActual);
    this.checarCitas();
  }
  

  onDateSelect(date: NgbDateStruct) {
      // `date` es de tipo `NgbDateStruct`
      //console.log('Date selected:', date);
      const jsDate = new Date(date.year, date.month - 1, date.day);
      this.fechaActual = formatDate(jsDate, 'yyyy-MM-dd', 'en-US');
      this.checarCitas();
      console.log("this fecha actual "+this.fechaActual);
      if(this.fechaActual == formatDate(new Date(),'yyyy-MM-dd', 'en-US' )){
        this.tituloTabla = "PACIENTES DE HOY";
      }
      else{
        this.tituloTabla = "PACIENTES DEL  "+this.fechaActual;
      }
  }

  checarCitas(){
    this.apiService.getCitas(this.fechaActual).subscribe((datos) => {
      console.log(datos);
      this.citasDeHoy = datos.array;
    });
  }
}
