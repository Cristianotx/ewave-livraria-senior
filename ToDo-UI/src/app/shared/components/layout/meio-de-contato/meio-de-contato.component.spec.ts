import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeioDeContatoComponent } from './meio-de-contato.component';

describe('MeioDeContatoComponent', () => {
  let component: MeioDeContatoComponent;
  let fixture: ComponentFixture<MeioDeContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeioDeContatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeioDeContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
