import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPacienteComponent } from './signup-paciente.component';

describe('SignupPacienteComponent', () => {
  let component: SignupPacienteComponent;
  let fixture: ComponentFixture<SignupPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
