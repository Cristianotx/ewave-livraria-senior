import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { Autor } from 'src/app/shared/interfaces/autor.interface';

const initialState = {
  autores: new Array<Autor>(),
  autoresAtivos: new Array<Autor>(),
  aggregateId: undefined,
};

const reducer = createReducer(
  initialState,
  on(actions.autoresCarregados, (state, { payload: autores }) => {
    return {
      ...state,
      autores,
    };
  }),
  on(actions.autoresAtivosCarregado, (state, { payload: autoresAtivos }) => {
    return {
      ...state,
      autoresAtivos,
    };
  }),
  on(actions.selecionarAutor, (state, { aggregateId }) => {
    return {
      ...state,
      aggregateId,
    };
  })
);

export function autorReducer(state, action) {
  return reducer(state, action);
}
