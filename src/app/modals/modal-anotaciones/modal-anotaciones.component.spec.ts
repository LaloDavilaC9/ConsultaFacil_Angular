import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnotacionesComponent } from './modal-anotaciones.component';

describe('ModalAnotacionesComponent', () => {
  let component: ModalAnotacionesComponent;
  let fixture: ComponentFixture<ModalAnotacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAnotacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAnotacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
