import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit  {
  

  comentarios = [
    { nombre: 'Usuario1', calificacion: 3, opinion: 'Excelente servicio.' },
    { nombre: 'Usuario2', calificacion: 5, opinion: 'Muy satisfecho con la atención.' },
    { nombre: 'Usuario3', calificacion: 2, opinion: 'Podría mejorar en algunos aspectos.' }
  ];

  totalConsultas = 120;
  edadPromedio = 35;
  tasaRetencion = 90;
  valoracionPromedio = 4.5;
  constructor() { }

  ngOnInit(): void {
  }

}
