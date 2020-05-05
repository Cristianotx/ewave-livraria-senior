import { createSelector } from '@ngrx/store';

export const selectAutor = (state) => state.autor;

export const selectTodosAutores = createSelector(selectAutor, (state) => state.autores);
export const selectAutoresAtivos = createSelector(selectAutor, (state) => state.autoresAtivos);
export const selectAutorSelecionado = createSelector(selectAutor, (state) => state.aggregateId);
