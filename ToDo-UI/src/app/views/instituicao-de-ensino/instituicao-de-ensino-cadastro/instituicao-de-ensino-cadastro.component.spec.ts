import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituicaoDeEnsinoCadastroComponent } from './instituicao-de-ensino-cadastro.component';

describe('InstituicaoDeEnsinoCadastroComponent', () => {
  let component: InstituicaoDeEnsinoCadastroComponent;
  let fixture: ComponentFixture<InstituicaoDeEnsinoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituicaoDeEnsinoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituicaoDeEnsinoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
