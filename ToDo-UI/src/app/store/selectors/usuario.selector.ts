import { createSelector } from '@ngrx/store';

export const selectUsuario = (state) => state.usuario;

export const selectTodosUsuarios = createSelector(selectUsuario, (state) => state.usuarios);
export const selectUsuariosAtivos = createSelector(selectUsuario, (state) => state.usuariosAtivos);
export const selectUsuarioSelecionado = createSelector(selectUsuario, (state) => state.aggregateId);
export const selectUsuarioObtido = createSelector(selectUsuario, (state) => state.usuario);
