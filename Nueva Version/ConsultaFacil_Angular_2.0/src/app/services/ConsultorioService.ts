// consultorio.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsultorioService {
  private idConsultorio: number = 5;

  setIdConsultorio(id: number): void {
    this.idConsultorio = id;
  }

  getIdConsultorio(): number {
    return this.idConsultorio;
  }
}
