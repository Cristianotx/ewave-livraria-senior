import { createSelector } from '@ngrx/store';

export const selectInstituicao = (state) => state.instituicaoDeEnsino;

export const selectTodasInstituicoes = createSelector(selectInstituicao, (state) => state.instituicoes);
export const selectInstituicoesAtivas = createSelector(selectInstituicao, (state) => state.instituicoesAtivas);
export const selectInstituicaoSelecionada = createSelector(selectInstituicao, (state) => state.aggregateId);
export const selectInstituicaoObtida = createSelector(selectInstituicao, (state) => state.instituicao);
