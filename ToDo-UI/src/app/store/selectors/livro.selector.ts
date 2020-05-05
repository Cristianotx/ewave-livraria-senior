import { createSelector } from '@ngrx/store';

export const selectLivro = (state) => state.livro;

export const selectTodosLivros = createSelector(selectLivro, (state) => state.livros);
export const selectLivroSelecionado = createSelector(selectLivro, (state) => state.livro);
export const selectLivroId = createSelector(selectLivro, (state) => state.id);
