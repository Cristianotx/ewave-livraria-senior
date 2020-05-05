import { createSelector } from '@ngrx/store';

export const selectDropDown = (state) => state.dropdown;

export const selectTodosEstados = createSelector(selectDropDown, (state) => state.estados);
export const selectTodasCidadesPorEstado = createSelector(selectDropDown, (state) => state.cidades);
