import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, mergeMap, map } from 'rxjs/operators';

import * as actions from '../actions';

import { LivroService } from 'src/app/shared/services/livro.service';
import { NotificationsService } from 'src/app/shared/base/service/notifications.service';

@Injectable()
export class LivroEffect {
  carregarLivros$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarTodosLivros),
      mergeMap(() => this.livroService.obterTodos()),
      switchMap((res) => [actions.livrosCarregados(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  obterLivro$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.obterLivroPorId),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.livroService.obterPorAggregateId(aggregateId)),
      switchMap((res) => [actions.livroObtido(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  salvarLivro$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.salvarLivro),
      map(({ livro }) => livro),
      mergeMap((livro) => this.livroService.salvar(livro)),
      map(() => {
        this.mensagemDeSucesso('Livro salvo com sucesso.');
        this.irParaPaginaDeConsulta();
        return actions.noAction();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  alterarLivro$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.alterarLivro),
      mergeMap(({ livro }) => this.livroService.alterar(livro.aggregateId, livro)),
      map(() => {
        this.mensagemDeSucesso('Livro alterado com sucesso.');
        this.irParaPaginaDeConsulta();
        return actions.noAction();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  ativarLivro$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ativarLivro),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.livroService.ativar(aggregateId)),
      map(() => {
        this.mensagemDeSucesso('Livro ativado com sucesso.');
        return actions.carregarTodosLivros();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  desativarLivro$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.desativarLivro),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.livroService.desativar(aggregateId)),
      map(() => {
        this.mensagemDeSucesso('Livro desativado com sucesso.');
        return actions.carregarTodosLivros();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  handleErrors(error) {
    return of(error);
  }

  irParaPaginaDeConsulta = () => this.router.navigate(['livros']);
  mensagemDeSucesso = (message: string) => this.notifications.showSuccessMessage('Sucesso', message);

  constructor(
    private actions$: Actions,
    private router: Router,
    private notifications: NotificationsService,
    private livroService: LivroService
  ) {}
}
