import { Component, OnInit, Injector } from '@angular/core';

import * as actions from '../../../store/actions';
import * as selectors from '../../../store/selectors';

import { ConsultaBase } from 'src/app/shared/base/consulta/consulta-base';
@Component({
  selector: 'app-livro-consulta',
  templateUrl: './livro-consulta.component.html',
  styleUrls: ['./livro-consulta.component.scss'],
})
export class LivroConsultaComponent extends ConsultaBase {
  constructor(injector: Injector) {
    super(injector);
    this.titulo = 'Livros';
    this.data$ = this.store.select(selectors.selectTodosLivros);
  }

  onInit() {}

  realizarConsulta(pagina?: number) {
    this.beforeSubscribe(pagina);
    this.store.dispatch(actions.carregarTodosLivros());
  }

  cadastar() {
    this.store.dispatch(actions.limparLivro());
    this.router.navigate(['livros', 'cadastrar']);
  }
}
