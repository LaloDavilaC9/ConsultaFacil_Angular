import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupConsultorioComponent } from './signup-consultorio.component';

describe('SignupConsultorioComponent', () => {
  let component: SignupConsultorioComponent;
  let fixture: ComponentFixture<SignupConsultorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupConsultorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupConsultorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
