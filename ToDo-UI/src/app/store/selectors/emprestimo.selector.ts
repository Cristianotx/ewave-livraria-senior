import { createSelector } from '@ngrx/store';

export const selectEmprestimo = (state) => state.emprestimo;

export const selectTodosEmprestimos = createSelector(selectEmprestimo, (state) => state.emprestimos);
export const selectModalEmprestimoVisivel = createSelector(selectEmprestimo, (state) => state.modalVisivel);
export const selectEmprestimoSelecionado = createSelector(selectEmprestimo, (state) => state.emprestimo);
