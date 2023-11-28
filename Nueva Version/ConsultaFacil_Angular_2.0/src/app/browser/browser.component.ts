import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/ApiService';
import { Consultorio } from '../consultorio';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  filtroNombre: string = '';
  filtroEspecialidad: string = '';
  consultoriosFiltrados: Consultorio[] = []; 
  consultorios : Consultorio[] = [];
  especialidades : any[] = [];
  
  

  constructor(private servicio: ApiService) { }

  ngOnInit(): void {
    this.cargarEspecialidades();
    this.cargarConsultorios();

  }

  buscarConsultorios() : void{
    // Lógica de búsqueda y filtrado de consultorios
    this.consultoriosFiltrados = this.consultorios.filter(consultorio => {
      return (
        consultorio.Nombre_Consultorio.toLowerCase().includes(this.filtroNombre.toLowerCase()) &&
        consultorio.Nombre_especialidad.toLowerCase().includes(this.filtroEspecialidad.toLowerCase())
      );
    });
  }

  cargarEspecialidades() : void{
    this.servicio.getEspecialidades().subscribe(
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
        this.especialidades = respuesta.array;
      },
      (error) => {
        console.error('Error al enviar datos:', error);
      }
    );
  }

  getRandomConsultorios(num: number): any[] {
    const consultorios = [...this.consultorios]; // Hacer una copia para no modificar el array original
    return Array.from({ length: num }, () => consultorios.splice(Math.floor(Math.random() * consultorios.length), 1)[0]);
  }

  cargarConsultorios() : void{
    this.servicio.getConsultoriosDisponibles().subscribe(
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
        this.consultorios = respuesta.array;
        this.consultoriosFiltrados = this.getRandomConsultorios(4);

      },
      (error) => {
        console.error('Error al enviar datos:', error);
      }
    );
  }
}