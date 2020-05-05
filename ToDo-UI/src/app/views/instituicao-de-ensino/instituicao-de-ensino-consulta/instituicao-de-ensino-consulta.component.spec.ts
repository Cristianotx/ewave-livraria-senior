import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituicaoDeEnsinoConsultaComponent } from './instituicao-de-ensino-consulta.component';

describe('InstituicaoDeEnsinoConsultaComponent', () => {
  let component: InstituicaoDeEnsinoConsultaComponent;
  let fixture: ComponentFixture<InstituicaoDeEnsinoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituicaoDeEnsinoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituicaoDeEnsinoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
