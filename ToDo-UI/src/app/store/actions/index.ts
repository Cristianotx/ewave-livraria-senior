import { createAction, props } from '@ngrx/store';

export * from './livro.action';
export * from './autor.action';
export * from './genero.action';
export * from './instituicao-de-ensino.action';
export * from './usuario.action';
export * from './emprestimo.action';
export * from './dropdown.action';
export * from './util.action';

export const noAction = createAction('State stay equal');
export const handleError = createAction('Handdle error', props<{ error }>());
