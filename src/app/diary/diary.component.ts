import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  horas = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
  ];

  estadoCitas: { [key: string]: string } = {
    '8:00 AM': 'PACIENTE',
    '9:00 AM': 'HABILITADA',
    '10:00 AM': 'DESHABILITADA',
    // ... (completa el estado de las horas según tu necesidad)
  };
  
  obtenerEstado(hora: string): string {
    return this.estadoCitas[hora] || 'HABILITADA'; // Por defecto, se asume como habilitada si no se especifica
  }

  esPaciente(hora: string): boolean {
    return this.obtenerEstado(hora) === 'PACIENTE';
  }

  esHabilitada(hora: string): boolean {
    return this.obtenerEstado(hora) === 'HABILITADA';
  }

  esDeshabilitada(hora: string): boolean {
    return this.obtenerEstado(hora) === 'DESHABILITADA';
  }

  verInformacion(hora: string) {
    // Lógica para ver la información de la cita
    console.log('Ver información para la hora:', hora);
  }

  cancelarCita(hora: string) {
    // Lógica para cancelar la cita
    console.log('Cancelar cita para la hora:', hora);
  }

  deshabilitarHora(hora: string) {
    // Lógica para deshabilitar la hora
    console.log('Deshabilitar hora para la hora:', hora);
  }

  habilitarHora(hora: string) {
    // Lógica para habilitar la hora
    console.log('Habilitar hora para la hora:', hora);
  }

}


