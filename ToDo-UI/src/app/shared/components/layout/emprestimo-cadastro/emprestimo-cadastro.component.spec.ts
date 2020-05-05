import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoCadastroComponent } from './emprestimo-cadastro.component';

describe('EmprestimoCadastroComponent', () => {
  let component: EmprestimoCadastroComponent;
  let fixture: ComponentFixture<EmprestimoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprestimoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprestimoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
