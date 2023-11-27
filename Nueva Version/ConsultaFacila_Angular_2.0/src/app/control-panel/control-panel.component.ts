import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct,  } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  template: `
  <ngb-datepicker #dp [(ngModel)]="model" (navigate)="date = $event.next" (select)="onDateSelect($event)"></ngb-datepicker>
  <p>Date selected: {{ selectedDate | date: 'shortDate' }}</p>`,
})
export class ControlPanelComponent implements OnInit {
  model: NgbDateStruct | undefined;
  date: NgbDateStruct| undefined;
  selectedDate: Date| undefined;
  constructor(private calendar: NgbCalendar) { }

  ngOnInit(): void {
    date: { year: Number; month: Number; day: Number};
    console.log('Date selected:', this.date);

  }
  

  onDateSelect(date: NgbDateStruct) {
      // `date` es de tipo `NgbDateStruct`
      console.log('Date selected:', date);
      
  }
}
