import { Component, OnInit } from '@angular/core';
import { NgbDateStruct,  } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, formatDate } from '@angular/common';
import { ApiService } from '../services/ApiService';
import { Console } from 'console';
import { ConsultorioService } from '../services/ConsultorioService';
import { MatDialog } from '@angular/material/dialog';
import { VerInformacionModalComponent } from '../modals/ver-informacion-modal/ver-informacion-modal.component';
import { Cita } from '../citas';

@Component({
  
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  model: NgbDateStruct | undefined;
  selectedDate: Date| undefined;
  fechaCompleta: String =  "";
  fechaString : String  = "";
  citas : any[] = [];
   
  horas = [
    '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00',
    '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00'
  ];
  constructor(private datePipe: DatePipe,private servicio: ApiService,private consultorioService: ConsultorioService,private dialog: MatDialog) { }


  ngOnInit(): void {
    this.calcularFecha(new Date());
    this.estadoDeAgenda();
  }

  //Verifica los horarios de ese día
  estadoDeAgenda() : void{
    this.servicio.getEstadoDeAgenda(this.consultorioService.getIdConsultorio(), this.fechaCompleta).subscribe((datos) => {
      this.citas = datos.array;
      console.log(this.citas);
    });
  }
  
  habilitarHora(hora: string) {
    //console.log('Habilitar hora para la hora:', hora);
    this.fechaCompleta = this.fechaCompleta + " "+hora;
    const datos = { 
      accion : 0,
      fecha : this.fechaCompleta,
      id_personal : 1,
      id_cita : 0
    };
    //console.log("En la consola: "+datos.fecha);
    
    this.servicio.configurarAgenda(datos).subscribe(
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
        this.ngOnInit();

      },
      (error) => {
        console.error('Error al enviar datos:', error);
      }
    );

  }

  
  deshabilitarHora(hora: string) {
    let citaActual : Cita  | undefined;
    this.citas.forEach(
        cita => {
            if(cita.HoraCita === hora){
              citaActual = cita;
            }
        }
    );
    const datos = { 
      accion : 1,
      fecha : null,
      id_personal : 0,
      id_cita : citaActual?.ID_Cita
    };

    this.servicio.configurarAgenda(datos).subscribe(
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
        this.ngOnInit();

      },
      (error) => {
        console.error('Error al enviar datos:', error);
      }
    );

  }

  cancelarCita(hora: string) {
    // Lógica para cancelar la cita
    this.deshabilitarHora(hora);
  }

  calcularFecha(fecha : Date) : void{
    this.fechaCompleta = this.datePipe.transform(fecha, 'yyyy-MM-dd ') ?? ''; 
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
    return this.datePipe.transform(fecha, formatoFecha, 'es') ?? '';
  }

  onDateSelect(date: NgbDateStruct) {
    // `date` es de tipo `NgbDateStruct`
    //console.log('Date selected:', date);
    this.calcularFecha(new Date(date.year, date.month - 1, date.day));
    this.estadoDeAgenda();

  }

  //Convierte a español el nombre del mes
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
  
  //Verifica si una hora está habilitada, deshabilitada o con paciente
  obtenerEstado(hora: string): string {
    let resultado : string = "DESHABILITADA";
    this.citas.forEach(
        cita => {
            if(cita.HoraCita === hora){
              if(cita.ID_Paciente === null){
                resultado = "HABILITADA";
              }
              else{
                resultado = "PACIENTE";
              }
            }
        }
    );
    //Tiene que estar en la base de datos para que esté habilitada la hora
    return resultado; // Por defecto, se asume como deshabilitada si no se especifica
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
    let citaActual : Cita  | undefined;
    this.citas.forEach(
        cita => {
            if(cita.HoraCita === hora){
              citaActual = cita;
            }
        }
    );
    

    const dialogRef = this.dialog.open(VerInformacionModalComponent, {
      data: { info: citaActual,fechaCita: this.fechaCompleta} // Puedes pasar datos al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró', result);
      // Puedes realizar acciones después de que el modal se haya cerrado
    });
  }

  



  
}


