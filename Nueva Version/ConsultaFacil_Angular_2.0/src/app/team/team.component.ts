import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/ApiService';
import { ConsultorioService } from '../services/ConsultorioService';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  
  especialidades : any[] = []

 /*  empleados = [
    { nombre: 'Juan', app:'Pérez', apm:'Márquez', Id_especialidad: '', Id_consulto },
    { nombre: 'María', app:'García', apm:'Serna', especialidad: '' },
    { nombre: 'Carlos', app:'Peña', apm:'López', especialidad: '' }
  ]; */

  nuevoEmpleado = {
    nombre: '',
    app: '',
    apm: '',
    Id_especialidad: '',
    Id_consultorio: this.consultorioService.getIdConsultorio()
  };

  darDeBaja(empleado: any) {
   /*  const index = this.empleados.indexOf(empleado);
    if (index !== -1) {
      this.empleados.splice(index, 1);
    } */
  }

  darDeAlta() {

    this.servicio.agregarPersonal(this.nuevoEmpleado).subscribe(
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
         
        this.nuevoEmpleado.nombre = '';
        this.nuevoEmpleado.app = '';
        this.nuevoEmpleado.apm = '';
        this.nuevoEmpleado.Id_especialidad = '';
        this.ngOnInit();

      },
      (error) => {
        console.error('Error al enviar datos:', error);
      }
    );
   
    /* if (this.nuevoEmpleado.nombre && this.nuevoEmpleado.app && this.nuevoEmpleado.apm && this.nuevoEmpleado.especialidad) {
      this.empleados.push({ ...this.nuevoEmpleado });

      
    } */
  }
  constructor(private servicio: ApiService,private consultorioService: ConsultorioService) { }

  ngOnInit(): void {
    this.cargarEspecialides();
  }

  cargarEspecialides():void{
    this.servicio.getEspecialidadesConsultorio(this.consultorioService.getIdConsultorio()).subscribe(
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
        this.especialidades = respuesta.array;
      },
      (error) => {
        console.error('Error al enviar datos:', error);
      }
    );
  }
}


