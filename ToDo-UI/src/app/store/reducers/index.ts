import { livroReducer } from './livro.reducer';
import { autorReducer } from './autor.reducer';
import { generoReducer } from './genero.reducer';
import { instituicaoDeEnsinoReducer } from './instituicao-de-ensino.reducer';
import { usuarioReducer } from './usuario.reducer';
import { emprestimoReducer } from './emprestimo.reducer';
import { dropdownReducer } from './dropdown.reducer';
import { utilReducer } from './util.reducer';

export default {
  livro: livroReducer,
  autor: autorReducer,
  genero: generoReducer,
  instituicaoDeEnsino: instituicaoDeEnsinoReducer,
  usuario: usuarioReducer,
  emprestimo: emprestimoReducer,
  dropdown: dropdownReducer,
  util: utilReducer,
};
