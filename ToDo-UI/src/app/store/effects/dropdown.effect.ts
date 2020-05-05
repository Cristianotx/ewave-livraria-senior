import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';

import * as actions from '../actions';

import { DropdownService } from 'src/app/shared/services/dropdown.service';

@Injectable()
export class DropdownEffect {
  carregarTodosEstados$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarTodosEstados),
      mergeMap(() => this.dropdownService.obterEstadosBrasileiros()),
      switchMap((res) => [actions.todosEstadosCarregados(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  carregarTodasCidadesPorEstadoId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarTodasCidadesPorEstadoId),
      mergeMap(({ estadoId }) => this.dropdownService.obterCidadesPorEstadoId(estadoId)),
      switchMap((res) => [actions.todasCidadesCarregadasPorEstadoId(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  handleErrors(error) {
    return of(error);
  }

  constructor(private actions$: Actions, private dropdownService: DropdownService) {}
}
