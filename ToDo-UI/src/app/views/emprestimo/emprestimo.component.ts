import { Component, Injector } from '@angular/core';

import * as actions from './../../store/actions';
import * as selectors from './../../store/selectors';

import { ConsultaBase } from 'src/app/shared/base/consulta/consulta-base';
import { Emprestimo } from 'src/app/shared/interfaces/emprestimo.interface';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.scss'],
})
export class EmprestimoComponent extends ConsultaBase {
  constructor(injector: Injector) {
    super(injector);
    this.titulo = 'Empréstimos';
    this.data$ = this.store.select(selectors.selectTodosEmprestimos);
  }

  onInit() {}

  realizarConsulta(pagina?: number) {
    this.beforeSubscribe(pagina);
    this.store.dispatch(actions.carregarTodosEmprestimos());
  }

  abrirModal = () => this.store.dispatch(actions.abrirModalEmprestimo());
  selecionar = (emprestimo: Emprestimo) => this.store.dispatch(actions.selecionarEmprestimo({ emprestimo }));
}
