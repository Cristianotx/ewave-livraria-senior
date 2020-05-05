import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { Usuario } from 'src/app/shared/interfaces/usuario.interface';

const initialState = {
  usuarios: new Array<Usuario>(),
  usuariosAtivos: new Array<Usuario>(),
  usuario: undefined,
  aggregateId: undefined,
};

const reducer = createReducer(
  initialState,
  on(actions.usuariosCarregados, (state, { payload: usuarios }) => {
    return {
      ...state,
      usuarios,
    };
  }),
  on(actions.usuariosAtivosCarregados, (state, { payload: usuariosAtivos }) => {
    return {
      ...state,
      usuariosAtivos,
    };
  }),
  on(actions.selecionarUsuario, (state, { aggregateId }) => {
    return {
      ...state,
      aggregateId,
    };
  }),
  on(actions.usuarioObtido, (state, { payload: usuario }) => {
    return {
      ...state,
      usuario,
    };
  }),
  on(actions.limparUsuario, (state) => {
    return {
      ...state,
      usuario: null,
    };
  })
);

export function usuarioReducer(state, action) {
  return reducer(state, action);
}
