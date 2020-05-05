import { createAction, props } from '@ngrx/store';
import { type } from './../utils';

import { Email } from 'src/app/shared/interfaces/email.interface';
import { Telefone } from 'src/app/shared/interfaces/telefone.interface';

const defaultCreator = (payload) => ({ payload });
const act = (text: string) => type(`[Util] - ${text}`);

export const obterTituloDaPagina = createAction(act('Obter título da pagína'));
export const alterarTiuloDaPagina = createAction(act('Alterar o título da pagína'), props<{ titulo }>());

export const carregarMenus = createAction(act('Carregar menus'));
export const menusCarregados = createAction(act('Menus carregados'), defaultCreator);
export const alterarMenuSelecionado = createAction(act('Alterar menu selecionado'), defaultCreator);

export const alterarPaginarAtual = createAction(act('Alterar página atual'), props<{ paginaAtual }>());

export const selecionarEmail = createAction(act('Selecionar um  e-mail.'), props<{ email: Email }>());
export const selecionarNovoEmail = createAction(act('Selecionar um novo e-mail.'), props<{ email: Email }>());
export const selecionarAlterarEmail = createAction(act('Selecionar um e-mail alterado.'), props<{ email: Email }>());
export const selecionarRemoverEmail = createAction(act('Selecionar um e-mail removido.'), props<{ email: Email }>());
export const adicionarEmail = createAction(act('Adicionar um novo e-mail.'), props<{ email: any }>());
export const removerEmail = createAction(act('Remover um novo e-mail.'), props<{ email: any }>());

export const selecionarTelefone = createAction(act('Selecionar um  telefone.'), props<{ telefone: Telefone }>());
export const selecionarNovoTelefone = createAction(act('Selecionar um novo telefone.'), props<{ telefone: Telefone }>());
export const selecionarAlterarTelefone = createAction(act('Selecionar um telefone alterado.'), props<{ telefone: Telefone }>());
export const selecionarRemoverTelefone = createAction(act('Selecionar um telefone removido.'), props<{ telefone: Telefone }>());
export const adicionarTelefone = createAction(act('Adicionar um novo telefone.'), props<{ telefone: any }>());
export const removerTelefone = createAction(act('Remover um novo telefone.'), props<{ telefone: any }>());
