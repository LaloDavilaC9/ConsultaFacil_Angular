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

    getEspecialidadesConsultorio(idConsultorio : Number): Observable<any> {
        return this.http.get(`${this.apiUrl}/especialidadesConsultorio/${idConsultorio}`);
    }

    getPersonalConsultorio(idConsultorio : Number): Observable<any> {
        return this.http.get(`${this.apiUrl}/personalConsultorio/${idConsultorio}`);
    }

    getConsultoriosDisponibles(): Observable<any> {
        return this.http.get(`${this.apiUrl}/consultoriosDisponibles`);
    }

    getEspecialidades(): Observable<any> {
        return this.http.get(`${this.apiUrl}/especialidadesDisponibles`);
    }

    getInfoConsultorio(idConsultorio : String | null): Observable<any> {
        return this.http.get(`${this.apiUrl}/infoConsultorio/${idConsultorio}`);
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

    // Método para realizar la solicitud POST
    agregarPersonal(datos: any) {
        // Configuración de las cabeceras (headers)
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        // Realizar la solicitud POST
        return this.http.post(`${this.apiUrl}/agregarPersonal`, datos, { headers });
    }

     // Método para realizar la solicitud POST
     darDeBajaPersonal(datos: any) {
        // Configuración de las cabeceras (headers)
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        // Realizar la solicitud POST
        return this.http.post(`${this.apiUrl}/darDeBajaPersonal`, datos, { headers });
    }
}
