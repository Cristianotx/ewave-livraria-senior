import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, mergeMap, map, withLatestFrom } from 'rxjs/operators';

import * as actions from '../actions';
import * as selectors from '../selectors';

import { InstituicaoDeEnsinoService } from 'src/app/shared/services/instituicao-de-ensino.service';
import { NotificationsService } from 'src/app/shared/base/service/notifications.service';

@Injectable()
export class InstituicaoDeEnsinoEffect {
  carregarInstituicoes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarTodasInstituicoes),
      mergeMap(() => this.instituicaoDeEnsinoService.obterTodos()),
      switchMap((res) => [actions.instituicoesCarregadas(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  obterInstituicoes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.obterInstituicaoPorId),
      mergeMap(({ aggregateId }) => this.instituicaoDeEnsinoService.obterPorAggregateId(aggregateId)),
      switchMap((res) => [actions.instituicaoObtida(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  carregarInstituicoesAtvos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarInstituicoesAtivas),
      mergeMap(() => this.instituicaoDeEnsinoService.obterTodosAtivos()),
      switchMap((res) => [actions.instituicoesAtivasCarregadas(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  salvarInstituicao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.salvarInstituicao),
      mergeMap(({ instituicao }) => this.instituicaoDeEnsinoService.salvar(instituicao)),
      map(() => {
        this.mensagemDeSucesso('Instituição de ensino salva com sucesso.');
        this.irParaPaginaDeConsulta();
        return actions.noAction();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  alterarInstituicao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.alterarinstituicao),
      mergeMap(({ instituicao }) => this.instituicaoDeEnsinoService.alterar(instituicao.aggregateId, instituicao)),
      map(() => {
        this.mensagemDeSucesso('Instituição de ensino alterada com sucesso.');
        this.irParaPaginaDeConsulta();
        return actions.noAction();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  ativarInstituicao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ativarInstituicao),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.instituicaoDeEnsinoService.ativar(aggregateId)),
      map(() => {
        this.mensagemDeSucesso('Instituição de ensino ativada com sucesso.');
        return actions.carregarTodasInstituicoes();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  desativarInstituicao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.desativarInstituicao),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.instituicaoDeEnsinoService.desativar(aggregateId)),
      map(() => {
        this.mensagemDeSucesso('Instituição de ensino desativada com sucesso.');
        return actions.carregarTodasInstituicoes();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );
  adicionarEmailInstituicao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.adicionarEmailInstituicao),
      withLatestFrom(this.store.pipe(select(selectors.selectInstituicaoSelecionada)), ({ email }, aggregateId) => ({
        email,
        aggregateId,
      })),
      mergeMap(({ email, aggregateId }) => this.instituicaoDeEnsinoService.adicionarEmail(aggregateId, email)),
      map((email) => {
        this.mensagemDeSucesso('E-mail adicionado com sucesso.');
        return actions.adicionarEmail({ email });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  alterarEmailInstituicao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.alterarEmailInstituicao),
      withLatestFrom(this.store.pipe(select(selectors.selectInstituicaoSelecionada)), ({ email }, aggregateId) => ({
        email,
        aggregateId,
      })),
      mergeMap(({ email, aggregateId }) => this.instituicaoDeEnsinoService.alterarEmail(aggregateId, email.id, email)),
      map((email) => {
        this.mensagemDeSucesso('E-mail do usário alterado com sucesso.');
        return actions.adicionarEmail({ email });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  removerEmailInstituicao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removerEmailInstituicao),
      withLatestFrom(this.store.pipe(select(selectors.selectInstituicaoSelecionada)), ({ email }, aggregateId) => ({
        email,
        aggregateId,
      })),
      mergeMap(({ email, aggregateId }) => this.instituicaoDeEnsinoService.removerEmail(aggregateId, email.id)),
      map((email) => {
        this.mensagemDeSucesso('E-mail do usuário excluído com sucesso.');
        return actions.removerEmail({ email });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  adicionarTelefoneInstituicao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.adicionarTelefoneInstituicao),
      withLatestFrom(this.store.pipe(select(selectors.selectInstituicaoSelecionada)), ({ telefone }, aggregateId) => ({
        telefone,
        aggregateId,
      })),
      mergeMap(({ telefone, aggregateId }) => this.instituicaoDeEnsinoService.adicionarTelefone(aggregateId, telefone)),
      map((telefone) => {
        this.mensagemDeSucesso('Telefone adicionado com sucesso.');
        return actions.adicionarTelefone({ telefone });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  alterarTelefoneInstituicao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.alterarTelefoneInstituicao),
      withLatestFrom(this.store.pipe(select(selectors.selectInstituicaoSelecionada)), ({ telefone }, aggregateId) => ({
        telefone,
        aggregateId,
      })),
      mergeMap(({ telefone, aggregateId }) =>
        this.instituicaoDeEnsinoService.alterarTelefone(aggregateId, telefone.id, telefone)
      ),
      map((telefone) => {
        this.mensagemDeSucesso('Telefone do usário alterado com sucesso.');
        return actions.adicionarTelefone({ telefone });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  removerTelefoneInstituicao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removerTelefoneInstituicao),
      withLatestFrom(this.store.pipe(select(selectors.selectInstituicaoSelecionada)), ({ telefone }, aggregateId) => ({
        telefone,
        aggregateId,
      })),
      mergeMap(({ telefone, aggregateId }) =>
        this.instituicaoDeEnsinoService.removerTelefone(aggregateId, telefone.id)
      ),
      map((telefone) => {
        this.mensagemDeSucesso('Telefone do usuário excluído com sucesso.');
        return actions.removerTelefone({ telefone });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  handleErrors(error) {
    return of(error);
  }

  irParaPaginaDeConsulta = () => this.router.navigate(['instituicoes-de-ensino']);
  mensagemDeSucesso = (message: string) => this.notifications.showSuccessMessage('Sucesso', message);

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private router: Router,
    private notifications: NotificationsService,
    private instituicaoDeEnsinoService: InstituicaoDeEnsinoService
  ) {}
}
