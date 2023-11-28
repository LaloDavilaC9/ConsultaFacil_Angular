import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    getEstadoDeAgenda(idConsultorio : Number,fecha : String): Observable<any> {
        return this.http.get(`${this.apiUrl}/estadoDeAgenda/${idConsultorio}/${fecha}`);
    }

    // Método para realizar la solicitud POST
    configurarAgenda(datos: any) {
        // Configuración de las cabeceras (headers)
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        // Realizar la solicitud POST
        return this.http.post(`${this.apiUrl}/configurarAgenda`, datos, { headers });
    }
}
