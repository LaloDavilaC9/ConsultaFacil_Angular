import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  
  empleados = [
    { nombre: 'Juan', app:'Pérez', apm:'Márquez', puesto: 'Médico' },
    { nombre: 'María', app:'García', apm:'Serna', puesto: 'Enfermera' },
    { nombre: 'Carlos', app:'Peña', apm:'López', puesto: 'Recepcionista' }
  ];

  nuevoEmpleado = {
    nombre: '',
    app: '',
    apm: '',
    puesto: ''
  };

  darDeBaja(empleado: any) {
    const index = this.empleados.indexOf(empleado);
    if (index !== -1) {
      this.empleados.splice(index, 1);
    }
  }

  darDeAlta() {
    if (this.nuevoEmpleado.nombre && this.nuevoEmpleado.puesto) {
      this.empleados.push({ ...this.nuevoEmpleado });
      this.nuevoEmpleado.nombre = '';
      this.nuevoEmpleado.puesto = '';
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}


