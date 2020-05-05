import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { InstituicaoDeEnsino } from 'src/app/shared/interfaces/instituicao-de-ensino.interface';

const initialState = {
  instituicoes: new Array<InstituicaoDeEnsino>(),
  instituicoesAtivas: new Array<InstituicaoDeEnsino>(),
  instituicao: undefined,
  aggregateId: undefined,
};

const reducer = createReducer(
  initialState,
  on(actions.instituicoesCarregadas, (state, { payload: instituicoes }) => {
    return {
      ...state,
      instituicoes,
    };
  }),
  on(actions.instituicoesAtivasCarregadas, (state, { payload: instituicoesAtivas }) => {
    return {
      ...state,
      instituicoesAtivas,
    };
  }),
  on(actions.selecionarInstituicao, (state, { aggregateId }) => {
    return {
      ...state,
      aggregateId,
    };
  }),
  on(actions.instituicaoObtida, (state, { payload: instituicao }) => {
    return {
      ...state,
      instituicao,
    };
  }),
  on(actions.limparInstituicao, (state) => {
    return {
      ...state,
      instituicao: null,
    };
  })
);

export function instituicaoDeEnsinoReducer(state, action) {
  return reducer(state, action);
}
