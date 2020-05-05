import { Component, OnInit, Injector } from '@angular/core';
import { ConsultaBase } from 'src/app/shared/base/consulta/consulta-base';

import * as actions from './../../../store/actions';
import * as selectors from './../../../store/selectors';

@Component({
  selector: 'app-reserva-consulta',
  templateUrl: './reserva-consulta.component.html',
  styleUrls: ['./reserva-consulta.component.scss'],
})
export class ReservaConsultaComponent extends ConsultaBase {
  livros;

  constructor(injector: Injector) {
    super(injector);
    this.data$ = this.store.select(selectors.selectTodosLivros)
  }

  onInit() {}

  realizarConsulta(pagina?: number) {
    this.beforeSubscribe(pagina);
    this.store.dispatch(actions.carregarTodosLivros());
  }
}
