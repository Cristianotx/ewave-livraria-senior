import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as actions from './../../../../store/actions';
import * as selectors from './../../../../store/selectors';

import { Estado } from 'src/app/shared/interfaces/estado.interface';
import { Cidade } from 'src/app/shared/interfaces/cidade.interface';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
})
export class EnderecoComponent implements OnInit {
  @Input()
  form: FormGroup;

  estados$: Observable<Estado>;
  cidades$: Observable<Cidade>;

  constructor(private store: Store<any>) {
    this.estados$ = this.store.select(selectors.selectTodosEstados);
    this.cidades$ = this.store.select(selectors.selectTodasCidadesPorEstado);
  }

  ngOnInit(): void {
    this.store.dispatch(actions.carregarTodosEstados());
    this.subscribeEnderecoValueChanges();

    const estado = this.form.get('estadoId');
    if (estado && estado.value) {
      this.store.dispatch(actions.carregarTodasCidadesPorEstadoId({ estadoId: estado.value }));
    } else {
      estado.setValue(null);
    }
  }

  subscribeEnderecoValueChanges() {
    this.form
      .get('estadoId')
      .valueChanges.pipe(filter((value) => value))
      .subscribe((estadoId) => {
        this.form.get('cidadeId').setValue(null);
        this.store.dispatch(actions.carregarTodasCidadesPorEstadoId({ estadoId }));
      });
  }
}
