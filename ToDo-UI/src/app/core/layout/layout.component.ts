import { Component, OnInit } from '@angular/core';

import * as selectors from './../../store/selectors';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  tituloDaPagina$: Observable<string>;

  constructor(private store: Store) {
    this.tituloDaPagina$ = store.pipe(select(selectors.selectTituloDaPagina));
  }

  ngOnInit(): void {}
}
