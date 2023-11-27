import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPacienteComponent } from './record-paciente.component';

describe('RecordPacienteComponent', () => {
  let component: RecordPacienteComponent;
  let fixture: ComponentFixture<RecordPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
