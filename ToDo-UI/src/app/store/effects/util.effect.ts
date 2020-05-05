import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';

import * as actions from '../actions';

import { UtilService } from 'src/app/shared/services/util.service';

@Injectable()
export class UtilEffect {
  carregarMenus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.carregarMenus),
      mergeMap(() => this.utilService.getMenus()),
      switchMap((res) => [actions.menusCarregados(res)]),
      catchError((error) => this.handleErrors(error))
    )
  );

  handleErrors(error) {
    return of(error);
  }

  constructor(private actions$: Actions, private store: Store<any>, private utilService: UtilService) {}
}
