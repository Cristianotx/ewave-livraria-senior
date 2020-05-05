import { createAction, props } from '@ngrx/store';

import { type } from './../utils';

const defaultCreator = (payload) => ({ payload });
const act = (text: string) => type(`[DropDown] - ${text}`);

export const carregarTodosEstados = createAction(act('Carregar todos os estados.'));
export const todosEstadosCarregados = createAction(act('Todos os estados carregados.'), defaultCreator);

export const carregarTodasCidadesPorEstadoId = createAction(
  act('Carregar todas cidades por estadoId'),
  props<{ estadoId: number }>()
);
export const todasCidadesCarregadasPorEstadoId = createAction(
  act('Todas cidades carregadas por estadoId.'),
  defaultCreator
);
