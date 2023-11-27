import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getCitas(fecha : String): Observable<any> {
    return this.http.get(`${this.apiUrl}/citasDeUnDia/${fecha}`);
  }

  getHistorico(idConsultorio : Number): Observable<any> {
    return this.http.get(`${this.apiUrl}/historicoConsultorio/${idConsultorio}`);
  }
}
