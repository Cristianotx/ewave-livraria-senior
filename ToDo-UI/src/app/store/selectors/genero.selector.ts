import { createSelector } from '@ngrx/store';

export const selectGenero = (state) => state.genero;

export const selectGenerosCarregados = createSelector(selectGenero, (state) => state.generos);
export const selectGenerosAtivos = createSelector(selectGenero, (state) => state.generosAtivos);
export const selectGeneroSelecionado = createSelector(selectGenero, (state) => state.aggregateId);
