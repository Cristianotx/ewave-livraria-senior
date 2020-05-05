import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, switchMap, mergeMap, map, withLatestFrom } from 'rxjs/operators';

import * as actions from '../actions';
import * as selectors from '../selectors';

import { GeneroService } from 'src/app/shared/services/genero.service';
import { NotificationsService } from 'src/app/shared/base/service/notifications.service';

@Injectable()
export class GeneroEffect {
  carregarGeneros$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarTodosGeneros),
      mergeMap(() => this.generoService.obterTodos()),
      switchMap((res) => [actions.generosCarregados(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  carregarGenerosAtvos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarGenerosAtivos),
      mergeMap(() => this.generoService.obterTodosAtivos()),
      switchMap((res) => [actions.generosAtivosCarregados(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  salvarGenero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.salvarGenero),
      map(({ genero }) => genero),
      mergeMap((genero) => {
        return this.generoService.salvar(genero);
      }),
      map(() => {
        this.mensagemDeSucesso('Gênero salvo com sucesso.');
        return actions.carregarTodosGeneros();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  alterarGenero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.alterarGenero),
      withLatestFrom(this.store.pipe(select(selectors.selectGeneroSelecionado)), ({ genero }, aggregateId) => ({
        genero,
        aggregateId,
      })),
      mergeMap(({ genero, aggregateId }) => {
        return this.generoService.alterar(aggregateId, genero);
      }),

      map(() => {
        this.mensagemDeSucesso('Gênero alterado com sucesso.');
        return actions.carregarTodosGeneros();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  ativarGenero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ativarGenero),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.generoService.ativar(aggregateId)),
      map(() => {
        this.mensagemDeSucesso('Gênero ativado com sucesso.');
        return actions.carregarTodosGeneros();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  desativarGenero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.desativarGenero),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.generoService.desativar(aggregateId)),
      map(() => {
        this.mensagemDeSucesso('Gênero desativado com sucesso.');
        return actions.carregarTodosGeneros();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  handleErrors(error) {
    return of(error);
  }

  mensagemDeSucesso = (message: string) => this.notifications.showSuccessMessage('Gênero', message);

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private notifications: NotificationsService,
    private generoService: GeneroService
  ) {}
}
