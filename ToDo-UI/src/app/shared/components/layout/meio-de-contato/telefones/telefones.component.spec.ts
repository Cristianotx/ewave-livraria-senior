import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonesComponent } from './telefones.component';

describe('TelefonesComponent', () => {
  let component: TelefonesComponent;
  let fixture: ComponentFixture<TelefonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
