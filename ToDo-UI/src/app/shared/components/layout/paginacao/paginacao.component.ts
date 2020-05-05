import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import * as actions from './../../../../store/actions';
import * as selectors from './../../../../store/selectors';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss'],
})
export class PaginacaoComponent {
  constructor(private store: Store<any>) {
    this.store.select(selectors.selectPaginaAtual).subscribe((pagina) => (this.paginaAtual = pagina));
  }

  public paginaAtual = 1;
  public paginaModel = 1;
  public mostrarTxtPaginacao = false;
  public exibirAlertaDePaginaInvalida = false;

  alterarPagina(pagina: number) {
    if (pagina >= 1) {
      this.mostrarTxtPaginacao = false;
      this.store.dispatch(actions.alterarPaginarAtual({ paginaAtual: pagina }));
    }
  }

  mostrarTxtPagina(event: any) {
    this.paginaModel = this.paginaAtual;
    this.mostrarTxtPaginacao = true;
    const txt = event.target.parentNode.children[0].children[0];
    setTimeout(() => {
      txt.focus();
      txt.select();
    }, 100);
  }

  avancarPagina() {
    this.alterarPagina(this.paginaAtual + 1);
  }

  voltarPagina() {
    this.alterarPagina(this.paginaAtual - 1);
  }

  onTxtPaginaEnterPressed() {
    this.alterarPagina(this.paginaModel);
  }

  onTxtPaginaKeyUp() {
    this.exibirAlertaDePaginaInvalida = this.paginaModel < 1;
  }

  onTxtPaginaChanged() {
    this.exibirAlertaDePaginaInvalida = this.paginaModel < 1;
  }

  onTxtPaginaEscPressed() {
    this.paginaModel = this.paginaAtual;
    this.mostrarTxtPaginacao = false;
    this.exibirAlertaDePaginaInvalida = false;
  }

  onTxtPaginaBlur() {
    setTimeout(() => {
      this.paginaModel = this.paginaAtual;
      this.mostrarTxtPaginacao = false;
      this.exibirAlertaDePaginaInvalida = false;
    }, 100);
  }

  somenteNumeroKeydown(event: any): any {
    return !(
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 187 && event.keyCode <= 190) ||
      event.keyCode === 107 ||
      event.keyCode === 109 ||
      event.keyCode === 110 ||
      event.keyCode === 194
    );
  }
}
