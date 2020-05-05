import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import * as actions from '../../../store/actions';
import * as selectors from '../../../store/selectors';

import { CadastroBase } from 'src/app/shared/base/cadastro/cadastro.base';
import { Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';

import { Email } from 'src/app/shared/interfaces/email.interface';
import { Telefone } from 'src/app/shared/interfaces/telefone.interface';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
})
export class UsuarioCadastroComponent extends CadastroBase {
  instituicoes$: Observable<any>;

  constructor(public injector: Injector, private activatedRoute: ActivatedRoute) {
    super(injector);
    this.titulo = this.isEdicao ? 'Editar usuário' : 'Cadastar usuário';

    this.activatedRoute.params.subscribe(({ id: aggregateId }) => {
      if (aggregateId) {
        this.store.dispatch(actions.selecionarUsuario(aggregateId));
        this.store.dispatch(actions.obterUsuarioPorId({ aggregateId }));
      }
    });

    this.store.select(selectors.selectUsuarioObtido).subscribe((usuario) => {
      if (usuario) {
        this.isEdicao = true;
        this.patchValue(usuario);
      }
    });

    this.store.dispatch(actions.carregarInstituicoesAtivas());
    this.instituicoes$ = this.store.select(selectors.selectInstituicoesAtivas);

    this.emailSubscriptions();
    this.telefoneSubscriptions();
  }

  emailSubscriptions() {
    this.store.select(selectors.selectNovoEmail).subscribe((email) => this.adicionarEmail(email));
    this.store.select(selectors.selectAlterarEmail).subscribe((email) => this.alterarEmail(email));
    this.store.select(selectors.selectRemoverEmail).subscribe((email) => this.removerEmail(email));
    this.store.select(selectors.selectEmails).subscribe((emails) => this.patchValueEmail(emails));
  }

  telefoneSubscriptions() {
    this.store.select(selectors.selectNovoTelefone).subscribe((telefone) => this.adicionarTelefone(telefone));
    this.store.select(selectors.selectAlterarTelefone).subscribe((telefone) => this.alterarTelefone(telefone));
    this.store.select(selectors.selectRemoverTelefone).subscribe((telefone) => this.removerTelefone(telefone));
    this.store.select(selectors.selectTelefones).subscribe((telefones) => this.patchValueTelefone(telefones));
  }

  onInit() {
    this.activatedRoute.params.subscribe(({ id: aggregateId }) => {
      if (aggregateId) {
        this.store.dispatch(actions.obterUsuarioPorId({ aggregateId }));
      }
    });

    this.store.select(selectors.selectUsuarioObtido).subscribe((usuario) => {
      if (usuario) {
        this.isEdicao = true;
        this.patchValue(usuario);
      }
    });
  }

  construirFormulario() {
    this.form = this.formBuilder.group({
      aggregateId: [null],
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      instituicaoDeEnsinoId: [null, Validators.required],
      emails: [null],
      telefones: [null],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        estadoId: [null, Validators.required],
        cidadeId: [null, Validators.required],
        logradouro: [null, Validators.required],
        numero: [null, Validators.required],
        bairro: [null, Validators.required],
        complemento: [null, Validators.required],
      }),
    });
  }

  patchValue(usuario: Usuario) {
    this.form.patchValue(usuario);
  }

  salvar() {
    const model = this.form.getRawValue();
    const { instituicaoDeEnsinoId, endereco, emails, telefones } = model;
    const { estadoId, cidadeId } = endereco;

    if (!emails && !telefones) {
      return;
    }

    const action = this.isEdicao
      ? actions.alterarUsuario({ usuario: model })
      : actions.salvarUsuario({ usuario: model });
    this.store.dispatch(action);
  }

  patchValueEmail(emails: Email) {
    this.form.get('emails').setValue(emails);
  }

  adicionarEmail(email: Email) {
    if (email) {
      if (this.isEdicao) {
        this.store.dispatch(actions.adicionarEmailUsuario({ email }));
      } else {
        this.store.dispatch(actions.adicionarEmail({ email }));
      }
    }
  }

  alterarEmail(email: Email) {
    if (email) {
      if (this.isEdicao) {
        this.store.dispatch(actions.adicionarEmailUsuario({ email }));
      } else {
        this.store.dispatch(actions.adicionarEmail({ email }));
      }
    }
  }

  removerEmail(email: Email) {
    if (email) {
      if (this.isEdicao) {
        this.store.dispatch(actions.removerEmailUsuario({ email }));
      } else {
        this.store.dispatch(actions.removerEmail({ email }));
      }
    }
  }

  patchValueTelefone(telefones: Telefone) {
    this.form.get('telefones').setValue(telefones);
  }

  adicionarTelefone(telefone: Telefone) {
    if (telefone) {
      if (this.isEdicao) {
        this.store.dispatch(actions.adicionarTelefoneUsuario({ telefone }));
      } else {
        this.store.dispatch(actions.adicionarTelefone({ telefone }));
      }
    }
  }

  alterarTelefone(telefone: Telefone) {
    if (telefone) {
      if (this.isEdicao) {
        this.store.dispatch(actions.adicionarTelefoneUsuario({ telefone }));
      } else {
        this.store.dispatch(actions.adicionarTelefone({ telefone }));
      }
    }
  }

  removerTelefone(telefone: Telefone) {
    if (telefone) {
      if (this.isEdicao) {
        this.store.dispatch(actions.removerTelefoneUsuario({ telefone }));
      } else {
        this.store.dispatch(actions.removerTelefone({ telefone }));
      }
    }
  }
}
