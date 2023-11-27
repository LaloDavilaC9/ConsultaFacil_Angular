import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../app/services/ApiService'
import { ConsultorioService } from '../services/ConsultorioService';
import { AnotacionesModalComponent } from '../modals/modal-anotaciones/modal-anotaciones.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  citasHistoricas : any[] = []

  constructor(private apiService: ApiService,private consultorioService: ConsultorioService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerHistorico();
  }

  obtenerHistorico(){
    this.apiService.getHistorico(this.consultorioService.getIdConsultorio()).subscribe((datos) => {
      console.log(datos);
      this.citasHistoricas = datos.array;
    });
  }
  openAnotacionesModal(numeroCita: number) {
    const dialogRef = this.dialog.open(AnotacionesModalComponent, {
      data: { numeroCita: numeroCita },
    });
  
    // Puedes realizar acciones después de cerrar el modal
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado', result);
    });
  }
}
