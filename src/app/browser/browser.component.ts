import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  filtroNombre: string = '';
  filtroEspecialidad: string = '';
  consultoriosFiltrados: any[] = []; // Aquí deberías tener la lista de consultorios con datos ficticios

  buscarConsultorios() {
    // Lógica de búsqueda y filtrado de consultorios
    this.consultoriosFiltrados = this.consultorios.filter(consultorio => {
      return (
        consultorio.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) &&
        consultorio.especialidad.toLowerCase().includes(this.filtroEspecialidad.toLowerCase())
      );
    });
  }

 // Datos ficticios de los consultorios
 consultorios = [
  {
    foto: '../../assets/consultorio1.jpeg',
    nombre: 'Consultorio Médico A',
    especialidad: 'Medicina General',
    costoConsulta: 50,
    ubicacion: 'Calle Principal 123',
    telefono: '123-456-7890'
  },
  {
    foto: '../../assets/Consultorio2.jpeg',
    nombre: 'Consultorio Dental B',
    especialidad: 'Dental',
    costoConsulta: 60,
    ubicacion: 'Avenida Central 456',
    telefono: '987-654-3210'
  },
  {
    foto: '../../assets/Consultorio3.jpeg',
    nombre: 'Consultorio Quiropráctico C',
    especialidad: 'Quiropráctica',
    costoConsulta: 70,
    ubicacion: 'Plaza del Pueblo 789',
    telefono: '555-555-5555'
  },
  {
    foto: '../../assets/Consultorio4.jpeg',
    nombre: 'Consultorio de Ginecología D',
    especialidad: 'Ginecología',
    costoConsulta: 80,
    ubicacion: 'Avenida del Sol 0123',
    telefono: '999-999-9999'
  }
  // Puedes agregar más consultorios aquí si es necesario
];
  constructor() { }

  ngOnInit(): void {
    this.consultoriosFiltrados = this.getRandomConsultorios(3);

  }
  getRandomConsultorios(num: number): any[] {
    const consultorios = [...this.consultorios]; // Hacer una copia para no modificar el array original
    return Array.from({ length: num }, () => consultorios.splice(Math.floor(Math.random() * consultorios.length), 1)[0]);
  }
}