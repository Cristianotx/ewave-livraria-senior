import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, mergeMap, map, withLatestFrom } from 'rxjs/operators';

import * as actions from '../actions';
import * as selectors from '../selectors';

import { AutorService } from 'src/app/shared/services/autor.service';
import { NotificationsService } from 'src/app/shared/base/service/notifications.service';

@Injectable()
export class AutorEffect {
  carregarAutores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarTodosAutores),
      mergeMap(() => this.autorService.obterTodos()),
      map((res) => actions.autoresCarregados(res)),
      catchError((error) => this.handleErrors(error))
    )
  );

  carregarAutoresAtivos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarAutoresAtivos),
      mergeMap(() => this.autorService.obterTodosAtivos()),
      map((res) => actions.autoresAtivosCarregado(res)),
      catchError((error) => this.handleErrors(error))
    )
  );

  salvarAutor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.salvarAutor),
      map(({ autor }) => autor),
      mergeMap((autor) => {
        return this.autorService.salvar(autor);
      }),
      map(() => {
        this.mensagemDeSucesso('Autor salvo com sucesso.');
        return actions.carregarTodosAutores();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  alterarAutor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.alterarAutor),
      withLatestFrom(this.store.pipe(select(selectors.selectAutorSelecionado)), ({ autor }, aggregateId) => ({
        autor,
        aggregateId,
      })),
      mergeMap(({ autor, aggregateId }) => {
        return this.autorService.alterar(aggregateId, autor);
      }),
      map(() => {
        this.mensagemDeSucesso('Autor alterado com sucesso.');
        return actions.carregarTodosAutores();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  ativarAutor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ativarAutor),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.autorService.ativar(aggregateId)),
      map(() => {
        this.mensagemDeSucesso('Autor ativado com sucesso.');
        return actions.carregarTodosAutores();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  desativarAutor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.desativarAutor),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.autorService.desativar(aggregateId)),
      map(() => {
        this.mensagemDeSucesso('Autor desativado com sucesso.');
        return actions.carregarTodosAutores();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  handleErrors(error) {
    return of(error);
  }

  mensagemDeSucesso = (message: string) => this.notifications.showSuccessMessage('Autor', message);

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private notifications: NotificationsService,
    private autorService: AutorService
  ) {}
}
