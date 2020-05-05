import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import * as actions from '../../../store/actions';
import * as selectors from '../../../store/selectors';

import { CadastroBase } from 'src/app/shared/base/cadastro/cadastro.base';
import { InstituicaoDeEnsino } from 'src/app/shared/interfaces/instituicao-de-ensino.interface';
import { Email } from 'src/app/shared/interfaces/email.interface';
import { Telefone } from 'src/app/shared/interfaces/telefone.interface';

@Component({
  selector: 'app-instituicao-de-ensino-cadastro',
  templateUrl: './instituicao-de-ensino-cadastro.component.html',
  styleUrls: ['./instituicao-de-ensino-cadastro.component.scss'],
})
export class InstituicaoDeEnsinoCadastroComponent extends CadastroBase {
  constructor(public injector: Injector, private activatedRoute: ActivatedRoute) {
    super(injector);
    this.titulo = this.isEdicao ? 'Editar Intituição de Ensino' : 'Cadastar Intituição de Ensino';

    this.activatedRoute.params.subscribe(({ id: aggregateId }) => {
      if (aggregateId) {
        this.store.dispatch(actions.selecionarInstituicao(aggregateId));
        this.store.dispatch(actions.obterInstituicaoPorId({ aggregateId }));
      }
    });

    this.store.select(selectors.selectInstituicaoObtida).subscribe((instituicao) => {
      if (instituicao) {
        this.isEdicao = true;
        this.patchValue(instituicao);
      }
    });

    this.emailSubscriptions();
    this.telefoneSubscriptions();
  }

  onInit() {
    this.store.select(selectors.selectInstituicaoObtida).subscribe((instituicao) => {
      if (instituicao) {
        this.isEdicao = true;
        this.patchValue(instituicao);
      }
    });
  }

  construirFormulario() {
    this.form = this.formBuilder.group({
      aggregateId: [null],
      nome: [null, Validators.required],
      cnpj: [null, Validators.required],
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

  patchValue(instituicao: InstituicaoDeEnsino) {
    this.form.patchValue(instituicao);
  }

  salvar() {
    const model = this.form.getRawValue();
    const { endereco, emails, telefones } = model;
    const { estadoId, cidadeId } = endereco;

    if (!emails && !telefones) {
      return;
    }

    const action = this.isEdicao
      ? actions.alterarinstituicao({ instituicao: model })
      : actions.salvarInstituicao({ instituicao: model });
    this.store.dispatch(action);
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

  patchValueEmail(emails: Array<Email>) {
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

  patchValueTelefone(telefones: Array<Telefone>) {
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
