import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, switchMap, mergeMap, map, withLatestFrom } from 'rxjs/operators';

import * as actions from '../actions';

import { EmprestimoService } from 'src/app/shared/services/emprestimo.service';
import { NotificationsService } from 'src/app/shared/base/service/notifications.service';

@Injectable()
export class EmprestimoEffect {
  carregarEmprestimos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarTodosEmprestimos),
      mergeMap(() => this.emprestimoService.obterTodos()),
      switchMap((res) => [actions.emprestimosCarregados(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  salvarEmprestimo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.salvarEmprestimo),
      mergeMap(({ emprestimo }) => this.emprestimoService.salvar(emprestimo)),
      map(() => {
        this.mensagemDeSucesso('Empréstimo salvo com sucesso.');
        return actions.limparEmprestimo();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );

  alterarEmprestimo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.alterarEmprestimo),
      mergeMap(({ emprestimo }) => this.emprestimoService.alterar(emprestimo.aggregateId, emprestimo)),
      map(() => {
        this.mensagemDeSucesso('Empréstimo salvo com sucesso.');
        return actions.limparEmprestimo();
      }),
      catchError((error) => this.handleErrors(error))
    )
  );
  handleErrors(error) {
    return of(error);
  }

  mensagemDeSucesso = (message: string) => this.notifications.showSuccessMessage('Sucesso', message);

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private notifications: NotificationsService,
    private emprestimoService: EmprestimoService
  ) {}
}
