import { Component, OnInit } from '@angular/core';
import { NgbDateStruct,  } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  model: NgbDateStruct | undefined;
  selectedDate: Date| undefined;
  fecha: Date | undefined;
  fechaString : String  = "";

  constructor(private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.calcularFecha(new Date());
  }

  calcularFecha(fecha : Date) : void{

    this.fechaString = this.formatFecha(fecha);
    const palabras = this.fechaString.split(' ');
    var mes : String = palabras[2];
    mes = this.getMonthFullName(mes);
    this.fechaString = palabras[0] +" "+ palabras[1] +" " + mes +" " + palabras[3] +" " + palabras[4];
    this.fechaString = this.fechaString.toUpperCase();

  }
  formatFecha(fecha : Date): string {
    // Aplica el formato deseado
    const formatoFecha = 'dd \'DE\' MMMM \'DE\' yyyy';
    // Usa el operador de coalescencia nula para proporcionar un valor predeterminado ('') si el resultado es null
    return this.datePipe.transform(fecha, formatoFecha, 'SP') ?? '';
  }


  onDateSelect(date: NgbDateStruct) {
    // `date` es de tipo `NgbDateStruct`
    //console.log('Date selected:', date);
    this.calcularFecha(new Date(date.year, date.month - 1, date.day));

  }

  
  getMonthFullName(month: String): String {
    switch (month) {
      case 'January':
        return 'Enero';
      case 'February':
        return 'Febrero';
      case 'March':
        return 'Marzo';
      case 'April':
        return 'Abril';
      case 'May':
        return 'Mayo';
      case 'June':
        return 'Junio';
      case 'July':
        return 'Julio';
      case 'August':
        return 'Agosto';
      case 'September':
        return 'Septiembre';
      case 'October':
        return 'Octubre';
      case 'November':
        return 'Noviembre';
      case 'December':
        return 'Diciembre';
      default:
        return 'Mes Desconocido';
    }
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


