import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroConsultaComponent } from './livro-consulta.component';

describe('LivroConsultaComponent', () => {
  let component: LivroConsultaComponent;
  let fixture: ComponentFixture<LivroConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivroConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
