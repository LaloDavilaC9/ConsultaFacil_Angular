import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConsultorioComponent } from './login-consultorio.component';

describe('LoginConsultorioComponent', () => {
  let component: LoginConsultorioComponent;
  let fixture: ComponentFixture<LoginConsultorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginConsultorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginConsultorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
