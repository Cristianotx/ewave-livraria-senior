import { createAction, props } from '@ngrx/store';

import { type } from '../utils';
import { Email } from 'src/app/shared/interfaces/email.interface';
import { Telefone } from 'src/app/shared/interfaces/telefone.interface';

const defaultCreator = (payload) => ({ payload });
const act = (text: string) => type(`[Instituição de Ensino] - ${text}`);

export const carregarTodasInstituicoes = createAction(act('Carregar todas Instiuições.'));
export const instituicoesCarregadas = createAction(act('Instituições carregadas.'), defaultCreator);

export const carregarInstituicoesAtivas = createAction(act('Carregar instituições ativas.'));
export const instituicoesAtivasCarregadas = createAction(act('Instituições ativas carregadas.'), defaultCreator);

export const obterInstituicaoPorId = createAction(act('Obter Instituição.'), props<{ aggregateId: string }>());
export const instituicaoObtida = createAction(act('Instituição obtida.'), defaultCreator);

export const selecionarInstituicao = createAction(act('Selecinar uma instituicao.'), props<{ aggregateId: string }>());
export const instituicaoSelecionada = createAction(act('Instituição selecionada.'), props<{ aggregateId: string }>());

export const salvarInstituicao = createAction(act('Salvar uma instituição.'), props<{ instituicao: any }>());
export const alterarinstituicao = createAction(act('Alterar uma instituição.'), props<{ instituicao: any }>());

export const ativarInstituicao = createAction(act('Ativar uma instituição.'), props<{ aggregateId: string }>());
export const desativarInstituicao = createAction(act('Desativar uma instituição.'), props<{ aggregateId: string }>());

export const limparInstituicao = createAction(act('Limpar instituição selecionada.'));


export const adicionarEmailInstituicao = createAction(act('Adicionar um e-mail a instituição'), props<{ email: Email }>());
export const alterarEmailInstituicao = createAction(act('Alterar um e-mail a instituição'), props<{ email: Email }>());
export const removerEmailInstituicao = createAction(act('Remover um e-mail a instituição'), props<{ email: Email }>());

export const adicionarTelefoneInstituicao = createAction(act('Adicionar um telefone a instituição'), props<{ telefone: Telefone }>());
export const alterarTelefoneInstituicao = createAction(act('Alterar um telefone a instituição'), props<{ telefone: Telefone }>());
export const removerTelefoneInstituicao = createAction(act('Remover um telefone a instituição'), props<{ telefone: Telefone }>());