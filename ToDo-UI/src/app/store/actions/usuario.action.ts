import { createAction, props } from '@ngrx/store';

import { type } from '../utils';
import { Email } from 'src/app/shared/interfaces/email.interface';
import { Telefone } from 'src/app/shared/interfaces/telefone.interface';

const defaultCreator = (payload) => ({ payload });
const act = (text: string) => type(`[Usuário] - ${text}`);

export const carregarTodosUsuarios = createAction(act('Carregar todos usuários.'));
export const usuariosCarregados = createAction(act('Usuários carregados.'), defaultCreator);

export const carregarUsuariosAtivos = createAction(act('Carregar usuários ativos.'));
export const usuariosAtivosCarregados = createAction(act('Usuários ativos carregados.'), defaultCreator);

export const caregarUsuarioAggregateId = createAction(
  act('Carregar aggregateId do usuário .'),
  props<{ aggregateId: string }>()
);

export const obterUsuarioPorId = createAction(act('Obter usuário.'), props<{ aggregateId: string }>());
export const usuarioObtido = createAction(act('Usuário obtida.'), defaultCreator);

export const selecionarUsuario = createAction(act('Selecinar um usuário.'), props<{ aggregateId: string }>());
export const usuarioSelecionado = createAction(act('Usuário selecionada.'), props<{ aggregateId: string }>());

export const salvarUsuario = createAction(act('Salvar um usuário.'), props<{ usuario: any }>());
export const alterarUsuario = createAction(act('Alterar uma usuário.'), props<{ usuario: any }>());

export const ativarUsuario = createAction(act('Ativar um usuário.'), props<{ aggregateId: string }>());
export const desativarUsuario = createAction(act('Desativar um usuário.'), props<{ aggregateId: string }>());

export const limparUsuario = createAction(act('Limpar usuário selecionado.'));

export const adicionarEmailUsuario = createAction(act('Adicionar um e-mail ao usuário'), props<{ email: Email }>());
export const alterarEmailUsuario = createAction(act('Alterar um e-mail ao usuário'), props<{ email: Email }>());
export const removerEmailUsuario = createAction(act('Remover um e-mail ao usuário'), props<{ email: Email }>());

export const adicionarTelefoneUsuario = createAction(act('Adicionar um telefone ao usuário'), props<{ telefone: Telefone }>());
export const alterarTelefoneUsuario = createAction(act('Alterar um telefone ao usuário'), props<{ telefone: Telefone }>());
export const removerTelefoneUsuario = createAction(act('Remover um telefone ao usuário'), props<{ telefone: Telefone }>());
