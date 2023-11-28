import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consultorio } from '../consultorio';
import { ApiService } from '../services/ApiService';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id_consultorio: string | null = "";
  especialidad : string | null = "";
  consultorioInfo : Consultorio  | null = null
  constructor(private route: ActivatedRoute,private servicio: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_consultorio = params.get('idConsultorio');
      this.especialidad = params.get('nombreEspecialidad');
      console.log("ID QUE LLEGA: "+this.id_consultorio);

      this.servicio.getInfoConsultorio(this.id_consultorio).subscribe(
        (respuesta) => {
          console.log('Respuesta del servidor:', respuesta);
          this.consultorioInfo = respuesta.array[0];
        },
        (error) => {
          console.error('Error al enviar datos:', error);
        }
      );
      
      // Luego usa consultorioId para cargar los detalles del consultorio desde tu servicio
      // this.consultorioService.getConsultorioDetails(consultorioId).subscribe(details => {
      //   // Hacer algo con los detalles
      // });
    });
  }

  /* consultorio = {
    nombre: 'Dr. Enrique Pelaéz Jiménez',
    especialidad: 'Medicina General',
    costoConsulta: 50,
    descripcion: 'El Dr. Enrique Peláez Jiménez cuenta con un consultorio de 25 años de experiencia atendiendo problemas relacionados con la salud de la columna vertebral. A lo largo de todo ese tiempo ha generado el alivio de más de 5 mil pacientes',
    ubicacion: 'Calle Principal 123',
    telefono: '123-456-7890'
  };
 */
  horasDisponibles = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];
  horasOcupadas = ['3:00 PM', '4:00 PM'];
  horasSeleccionadas: string[] = []; 

  
    toggleHora(hora: string) {
    const index = this.horasSeleccionadas.indexOf(hora);
    if (index !== -1) {
      this.horasSeleccionadas.splice(index, 1);
    } else {
      this.horasSeleccionadas = [hora];
    }
  }
  
  isHoraSeleccionada(hora: string) {
    return this.horasSeleccionadas.includes(hora);
  }
 
  activeSlideIndex = 0;
  slides = [
    { image: 'assets/consultorio1.jpeg' },
    { image: 'assets/Consultorio2.jpeg' },
    { image: 'assets/Consultorio3.jpeg' }
  ];

  prevSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slides.length;
  } 
}





