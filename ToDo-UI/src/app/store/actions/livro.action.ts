import { createAction, props } from '@ngrx/store';

import { type } from '../utils';

import { Livro } from 'src/app/shared/interfaces/livro.interface';

const defaultCreator = (payload) => ({ payload });
const act = (text: string) => type(`[Livro] - ${text}`);

export const carregarTodosLivros = createAction(act('Carregar todos livros.'));
export const livrosCarregados = createAction(act('Livros carregados.'), defaultCreator);

export const obterLivroPorId = createAction(act('Obter livro.'), props<{ aggregateId: string }>());
export const livroObtido = createAction(act('Livro obtido.'), defaultCreator);

export const salvarLivro = createAction(act('Salvar um livro.'), props<{ livro: any }>());
export const alterarLivro = createAction(act('Alterar um livro.'), props<{ livro: any }>());

export const ativarLivro = createAction(act('Ativar um livro.'), props<{ aggregateId: string }>());
export const desativarLivro = createAction(act('Desativar um lviro.'), props<{ aggregateId: string }>());

export const caregarLivroId = createAction(act('Carregar id do livro .'), props<{ id: number }>());
export const limparLivroId = createAction(act('Limpar id do livro .'));

export const limparLivro = createAction(act('Limpar livro selecionado.'));
