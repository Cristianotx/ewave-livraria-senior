import { createAction, props } from '@ngrx/store';

import { type } from './../utils';

const defaultCreator = (payload) => ({ payload });
const act = (text: string) => type(`[Empréstimos] - ${text}`);

export const carregarTodosEmprestimos = createAction(act('Carregar todos empréstimos.'));
export const emprestimosCarregados = createAction(act('Empréstimos carregados.'), defaultCreator);

export const selecionarEmprestimo = createAction(act('Selecionar um empréstimo.'), props<{ emprestimo: any }>());

export const salvarEmprestimo = createAction(act('Salvar um Empréstimo.'), props<{ emprestimo: any }>());
export const alterarEmprestimo = createAction(act('Alterar um Empréstimo.'), props<{ emprestimo: any }>());

export const abrirModalEmprestimo = createAction(act('Abrir modal de empréstimo.'));
export const fecharModalEmprestimo = createAction(act('Fechar modal de empréstimo.'));

export const limparEmprestimo = createAction(act('Limpar emprestimo selecionado.'));
