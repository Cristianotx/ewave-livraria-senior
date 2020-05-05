import { createSelector } from '@ngrx/store';

export const selectUtil = (state) => state.util;

export const selectMenus = createSelector(selectUtil, (state) => state.menus);
export const selectTituloDaPagina = createSelector(selectUtil, (state) => state.tituloDaPagina);
export const selectPaginaAtual = createSelector(selectUtil, (state) => state.paginaAtual);

export const selectEmails = createSelector(selectUtil, (state) => state.emails);
export const selectNovoEmail = createSelector(selectUtil, (state) => state.novoEmail);
export const selectAlterarEmail = createSelector(selectUtil, (state) => state.alterarEmail);
export const selectRemoverEmail = createSelector(selectUtil, (state) => state.removerEmail);
export const selectEmailSelecionado = createSelector(selectUtil, (state) => state.email);

export const selectTelefones = createSelector(selectUtil, (state) => state.telefones);
export const selectNovoTelefone = createSelector(selectUtil, (state) => state.novoTelefone);
export const selectAlterarTelefone = createSelector(selectUtil, (state) => state.alterarTelefone);
export const selectRemoverTelefone = createSelector(selectUtil, (state) => state.removerTelefone);
export const selectTelefoneSelecionado = createSelector(selectUtil, (state) => state.telefone);
