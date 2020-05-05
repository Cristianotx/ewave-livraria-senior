import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, switchMap, mergeMap, map, withLatestFrom } from 'rxjs/operators';

import * as actions from '../actions';
import * as selectors from '../selectors';

import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { NotificationsService } from 'src/app/shared/base/service/notifications.service';

@Injectable()
export class UsuarioEffect {
  carregarTodosUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarTodosUsuarios),
      mergeMap(() => this.usuarioService.obterTodos()),
      switchMap((res) => [actions.usuariosCarregados(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  obterUsuarioPorId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.obterUsuarioPorId),
      mergeMap(({ aggregateId }) => this.usuarioService.obterPorAggregateId(aggregateId)),
      switchMap((res) => [actions.usuarioObtido(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  carregarUsuariosAtvos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarUsuariosAtivos),
      mergeMap(() => this.usuarioService.obterTodosAtivos()),
      switchMap((res) => [actions.usuariosAtivosCarregados(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  salvarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.salvarUsuario),
      mergeMap(({ usuario }) => this.usuarioService.salvar(usuario)),
      map(() => {
        this.mensagemDeSucesso('Usuário salvo com sucesso.');
        this.irParaPaginaDeConsulta();
        return actions.noAction();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  alterarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.alterarUsuario),
      mergeMap(({ usuario }) => this.usuarioService.alterar(usuario.aggregateId, usuario)),
      map(() => {
        this.mensagemDeSucesso('Usuário alteado com sucesso.');
        this.irParaPaginaDeConsulta();
        return actions.noAction();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  ativarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ativarUsuario),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.usuarioService.ativar(aggregateId)),
      map(() => {
        this.mensagemDeSucesso('Usuário ativado com sucesso.');
        return actions.carregarTodosUsuarios();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  desativarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.desativarUsuario),
      map(({ aggregateId }) => aggregateId),
      mergeMap((aggregateId) => this.usuarioService.desativar(aggregateId)),
      map(() => {
        this.mensagemDeSucesso('Usuário desativado com sucesso.');
        return actions.carregarTodosUsuarios();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );
  adicionarEmailusuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.adicionarEmailUsuario),
      withLatestFrom(this.store.pipe(select(selectors.selectUsuarioSelecionado)), ({ email }, aggregateId) => ({
        email,
        aggregateId,
      })),
      mergeMap(({ email, aggregateId }) => this.usuarioService.adicionarEmail(aggregateId, email)),
      map((email) => {
        this.mensagemDeSucesso('E-mail adicionado com sucesso.');
        return actions.adicionarEmail({ email });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  alterarEmailusuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.alterarEmailUsuario),
      withLatestFrom(this.store.pipe(select(selectors.selectUsuarioSelecionado)), ({ email }, aggregateId) => ({
        email,
        aggregateId,
      })),
      mergeMap(({ email, aggregateId }) => this.usuarioService.alterarEmail(aggregateId, email.id, email)),
      map((email) => {
        this.mensagemDeSucesso('E-mail do usário alterado com sucesso.');
        return actions.adicionarEmail({ email });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  removerEmailusuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removerEmailUsuario),
      withLatestFrom(this.store.pipe(select(selectors.selectUsuarioSelecionado)), ({ email }, aggregateId) => ({
        email,
        aggregateId,
      })),
      mergeMap(({ email, aggregateId }) => this.usuarioService.removerEmail(aggregateId, email.id)),
      map((email) => {
        this.mensagemDeSucesso('E-mail do usuário excluído com sucesso.');
        return actions.removerEmail({ email });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  adicionarTelefoneUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.adicionarTelefoneUsuario),
      withLatestFrom(this.store.pipe(select(selectors.selectUsuarioSelecionado)), ({ telefone }, aggregateId) => ({
        telefone,
        aggregateId,
      })),
      mergeMap(({ telefone, aggregateId }) => this.usuarioService.adicionarTelefone(aggregateId, telefone)),
      map((telefone) => {
        this.mensagemDeSucesso('Telefone adicionado com sucesso.');
        return actions.adicionarTelefone({ telefone });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  alterarTelefoneUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.alterarTelefoneUsuario),
      withLatestFrom(this.store.pipe(select(selectors.selectUsuarioSelecionado)), ({ telefone }, aggregateId) => ({
        telefone,
        aggregateId,
      })),
      mergeMap(({ telefone, aggregateId }) => this.usuarioService.alterarTelefone(aggregateId, telefone.id, telefone)),
      map((telefone) => {
        this.mensagemDeSucesso('Telefone do usário alterado com sucesso.');
        return actions.adicionarTelefone({ telefone });
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  removerTelefoneUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removerTelefoneUsuario),
      withLatestFrom(this.store.pipe(select(selectors.selectUsuarioSelecionado)), ({ telefone }, aggregateId) => ({
        telefone,
        aggregateId,
      })),
      mergeMap(({ telefone, aggregateId }) => this.usuarioService.removerTelefone(aggregateId, telefone.id)),
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

  irParaPaginaDeConsulta = () => this.router.navigate(['usuarios']);
  mensagemDeSucesso = (message: string) => this.notifications.showSuccessMessage('Sucesso', message);

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private usuarioService: UsuarioService,
    private router: Router,
    private notifications: NotificationsService
  ) {}
}
