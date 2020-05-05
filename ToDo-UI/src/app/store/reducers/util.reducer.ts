import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { Email } from 'src/app/shared/interfaces/email.interface';
import { Telefone } from 'src/app/shared/interfaces/telefone.interface';

const initialState = {
  tituloDaPagina: null,
  menus: undefined,
  paginaAtual: 1,
  emails: new Array<Email>(),
  email: null,
  novoEmail: null,
  alterarEmail: null,
  removerEmail: null,
  telefones: new Array<Telefone>(),
  telefone: null,
  novoTelefone: null,
  alterarTelefone: null,
  removerTelefone: null,
};

const reducer = createReducer(
  initialState,
  on(actions.menusCarregados, (state, { payload: menus }) => {
    return {
      ...state,
      menus,
    };
  }),

  on(actions.alterarMenuSelecionado, (state, { payload }) => {
    const { menus } = state;

    return {
      ...state,
      menus,
    };
  }),

  on(actions.alterarTiuloDaPagina, (state, { titulo: tituloDaPagina }) => {
    return {
      ...state,
      tituloDaPagina,
    };
  }),
  on(actions.alterarPaginarAtual, (state, { paginaAtual }) => {
    return {
      ...state,
      paginaAtual,
    };
  }),
  on(actions.adicionarEmail, (state, { email }) => {
    let emails = [...state.emails];

    let emailSelecionado = emails.find((x) => email.id && x.id === email.id);
    if (emailSelecionado) {
      emails = [...emails.filter((x) => x.id !== email.id)];
    }

    emailSelecionado = emails.find((x) => x.endereco === email.endereco);
    if (emailSelecionado) {
      emails = [...emails.filter((x) => x.endereco !== email.endereco)];
    }

    return {
      ...state,
      emails: [...emails, email],
    };
  }),
  on(actions.removerEmail, (state, { email }) => {
    let emails = [...state.emails];

    let emailSelecionado = emails.find((x) => email.id && x.id === email.id);
    if (emailSelecionado) {
      emails = [...emails.filter((x) => x.id !== email.id)];
    }

    emailSelecionado = emails.find((x) => x.endereco === email.endereco);
    if (emailSelecionado) {
      emails = [...emails.filter((x) => x.endereco !== email.endereco)];
    }

    return {
      ...state,
      emails,
    };
  }),

  on(actions.selecionarEmail, (state, { email }) => {
    return {
      ...state,
      email,
    };
  }),
  on(actions.selecionarNovoEmail, (state, { email: novoEmail }) => {
    return {
      ...state,
      novoEmail,
    };
  }),
  on(actions.selecionarAlterarEmail, (state, { email: alterarEmail }) => {
    return {
      ...state,
      alterarEmail,
    };
  }),
  on(actions.selecionarRemoverEmail, (state, { email: removerEmail }) => {
    return {
      ...state,
      removerEmail,
    };
  }),
  on(actions.adicionarTelefone, (state, { telefone }) => {
    let telefones = [...state.telefones];

    let telefoneSelecionado = telefones.find((x) => telefone.id && x.id === telefone.id);
    if (telefoneSelecionado) {
      telefones = [...telefones.filter((x) => x.id !== telefone.id)];
    }

    telefoneSelecionado = telefones.find((x) => x.numero === telefone.numero);
    if (telefoneSelecionado) {
      telefones = [...telefones.filter((x) => x.numero !== telefone.numero)];
    }

    return {
      ...state,
      telefones: [...telefones, telefone],
    };
  }),
  on(actions.removerTelefone, (state, { telefone }) => {
    let telefones = [...state.telefones];

    let telefoneSelecionado = telefones.find((x) => telefone.id && x.id === telefone.id);
    if (telefoneSelecionado) {
      telefones = [...telefones.filter((x) => x.id !== telefone.id)];
    }

    telefoneSelecionado = telefones.find((x) => x.numero === telefone.numero);
    if (telefoneSelecionado) {
      telefones = [...telefones.filter((x) => x.numero !== telefone.numero)];
    }

    return {
      ...state,
      telefones,
    };
  }),

  on(actions.selecionarTelefone, (state, { telefone }) => {
    return {
      ...state,
      telefone,
    };
  }),
  on(actions.selecionarNovoTelefone, (state, { telefone: novoTelefone }) => {
    return {
      ...state,
      novoTelefone,
    };
  }),
  on(actions.selecionarAlterarTelefone, (state, { telefone: alterarTelefone }) => {
    return {
      ...state,
      alterarTelefone,
    };
  }),
  on(actions.selecionarRemoverTelefone, (state, { telefone: removerTelefone }) => {
    return {
      ...state,
      removerTelefone,
    };
  })
);

export function utilReducer(state, action) {
  return reducer(state, action);
}
