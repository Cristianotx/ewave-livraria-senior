import { TestBed } from '@angular/core/testing';

import { InstituicaoDeEnsinoService } from './instituicao-de-ensino.service';

describe('InstituicaoDeEnsinoService', () => {
  let service: InstituicaoDeEnsinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituicaoDeEnsinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
