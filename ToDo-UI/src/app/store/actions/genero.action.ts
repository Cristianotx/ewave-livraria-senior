import { createAction, props } from '@ngrx/store';

import { type } from '../utils';

const defaultCreator = (payload) => ({ payload });
const act = (text: string) => type(`[Gênero] - ${text}`);

export const carregarTodosGeneros = createAction(act('Carregar todos gêneros.'));
export const generosCarregados = createAction(act('Gêneros carregados.'), defaultCreator);

export const carregarGenerosAtivos = createAction(act('Carregar gêneros ativos.'));
export const generosAtivosCarregados = createAction(act('Gêneros ativos carregados.'), defaultCreator);

export const selecionarGenero = createAction(act('Selecinar um gênero.'), props<{ aggregateId: string }>());
export const generoSelecionado = createAction(act('Gênero selecionado.'), props<{ aggregateId: string }>());

export const salvarGenero = createAction(act('Salvar um gênero.'), props<{ genero: any }>());
export const alterarGenero = createAction(act('Alterar um gênero.'), props<{ genero: any }>());

export const ativarGenero = createAction(act('Ativar um gênero.'), props<{ aggregateId: string }>());
export const desativarGenero = createAction(act('Desativar um gênero.'), props<{ aggregateId: string }>());
