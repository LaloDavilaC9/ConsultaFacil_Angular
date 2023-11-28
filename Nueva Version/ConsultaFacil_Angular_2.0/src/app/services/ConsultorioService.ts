// consultorio.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsultorioService {
  private idConsultorio: number = 1;

  setIdConsultorio(id: number): void {
    this.idConsultorio = id;
  }

  getIdConsultorio(): number {
    return this.idConsultorio;
  }
}
