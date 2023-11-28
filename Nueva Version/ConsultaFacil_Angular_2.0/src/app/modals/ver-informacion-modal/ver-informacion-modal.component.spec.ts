import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInformacionModalComponent } from './ver-informacion-modal.component';

describe('VerInformacionModalComponent', () => {
  let component: VerInformacionModalComponent;
  let fixture: ComponentFixture<VerInformacionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerInformacionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerInformacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
