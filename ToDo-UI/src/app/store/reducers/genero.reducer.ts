import { createReducer, on, State } from '@ngrx/store';

import * as actions from '../actions';

import { Genero } from 'src/app/shared/interfaces/genero.interface';

const initialState = {
  generos: new Array<Genero>(),
  generosAtivos: new Array<Genero>(),
  aggregateId: undefined,
};

const reducer = createReducer(
  initialState,
  on(actions.generosCarregados, (state, { payload: generos }) => {
    return {
      ...state,
      generos,
    };
  }),
  on(actions.generosAtivosCarregados, (state, { payload: generosAtivos }) => {
    return {
      ...state,
      generosAtivos,
    };
  }),
  on(actions.selecionarGenero, (state, { aggregateId }) => {
    return {
      ...state,
      aggregateId,
    };
  })
);

export function generoReducer(state, action) {
  return reducer(state, action);
}
