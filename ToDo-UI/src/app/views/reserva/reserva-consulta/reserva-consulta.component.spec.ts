import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaConsultaComponent } from './reserva-consulta.component';

describe('ReservaConsultaComponent', () => {
  let component: ReservaConsultaComponent;
  let fixture: ComponentFixture<ReservaConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
