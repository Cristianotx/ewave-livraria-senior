import { createAction, props } from '@ngrx/store';

import { type } from './../utils';

const defaultCreator = (payload) => ({ payload });
const act = (text: string) => type(`[Autor] - ${text}`);

export const carregarTodosAutores = createAction(act('Carregar todos autores.'));
export const autoresCarregados = createAction(act('Autores carregados.'), defaultCreator);

export const carregarAutoresAtivos = createAction(act('Carregar autores ativos.'));
export const autoresAtivosCarregado = createAction(act('Autores ativos carregado.'), defaultCreator);

export const selecionarAutor = createAction(act('Selecinar um autor.'), props<{ aggregateId: string }>());
export const autorSelecionado = createAction(act('Autor selecionado.'), props<{ aggregateId: string }>());

export const salvarAutor = createAction(act('Salvar um autor.'), props<{ autor: any }>());
export const alterarAutor = createAction(act('Alterar um autor.'), props<{ autor: any }>());

export const ativarAutor = createAction(act('Ativar um autor.'), props<{ aggregateId: string }>());
export const desativarAutor = createAction(act('Desativar um autor.'), props<{ aggregateId: string }>());
