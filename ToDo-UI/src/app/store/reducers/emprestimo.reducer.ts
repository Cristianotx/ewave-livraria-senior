import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { Emprestimo } from 'src/app/shared/interfaces/emprestimo.interface';

const initialState = {
  emprestimos: new Array<Emprestimo>(),
  emprestimo: null,
  modalVisivel: null,
};

const reducer = createReducer(
  initialState,
  on(actions.emprestimosCarregados, (state, { payload: emprestimos }) => {
    return {
      ...state,
      emprestimos,
    };
  }),
  on(actions.selecionarEmprestimo, (state, { emprestimo }) => {
    return {
      ...state,
      emprestimo,
    };
  }),
  on(actions.abrirModalEmprestimo, (state) => {
    return {
      ...state,
      modalVisivel: true,
    };
  }),
  on(actions.fecharModalEmprestimo, (state) => {
    return {
      ...state,
      modalVisivel: false,
    };
  }),
  on(actions.limparEmprestimo, (state) => {
    return {
      ...state,
      emprestimo: null,
    };
  })
);

export function emprestimoReducer(state, action) {
  return reducer(state, action);
}
