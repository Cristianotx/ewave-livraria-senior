import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { Livro } from 'src/app/shared/interfaces/livro.interface';

const initialState = {
  livros: new Array<Livro>(),
  livro: null,
  id: null,
};

const reducer = createReducer(
  initialState,
  on(actions.livrosCarregados, (state, { payload: livros }) => {
    return {
      ...state,
      livros,
    };
  }),
  on(actions.livroObtido, (state, { payload: livro }) => {
    return {
      ...state,
      livro,
    };
  }),
  on(actions.limparLivro, (state) => {
    return {
      ...state,
      livro: null,
    };
  }),
  on(actions.caregarLivroId, (state, { id }) => {
    return {
      ...state,
      id,
    };
  }),
  on(actions.limparLivroId, (state) => {
    return {
      ...state,
      id: null,
    };
  })
);

export function livroReducer(state, action) {
  return reducer(state, action);
}
