import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { Estado } from 'src/app/shared/interfaces/estado.interface';
import { Cidade } from 'src/app/shared/interfaces/cidade.interface';

const initialState = {
  estados: new Array<Estado>(),
  cidades: new Array<Cidade>(),
};

const reducer = createReducer(
  initialState,
  on(actions.todosEstadosCarregados, (state, { payload: estados }) => {
    return {
      ...state,
      estados,
    };
  }),
  on(actions.todasCidadesCarregadasPorEstadoId, (state, { payload: cidades }) => {
    return {
      ...state,
      cidades,
    };
  })
);

export function dropdownReducer(state, action) {
  return reducer(state, action);
}
