import { Component, OnInit, Input } from '@angular/core';
import { Livro } from 'src/app/shared/interfaces/livro.interface';
import { Router } from '@angular/router';

import * as actions from './../../../../store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.scss'],
})
export class LivroComponent implements OnInit {
  @Input() livro: Livro;

  constructor(private store: Store<any>, private router: Router) {}

  ngOnInit(): void {}

  alterarSituacao(livro: Livro) {
    const { aggregateId, ativo } = livro;
    const action = ativo ? actions.desativarLivro({ aggregateId }) : actions.ativarLivro({ aggregateId });
    this.store.dispatch(action);
  }

  reservar(livro: Livro) {}
  emprestar({ id }) {
    this.store.dispatch(actions.caregarLivroId({ id }));
    this.store.dispatch(actions.abrirModalEmprestimo());
  }
  alterar = (livro: Livro) => this.router.navigate(['livros', livro.aggregateId, 'editar']);
}
