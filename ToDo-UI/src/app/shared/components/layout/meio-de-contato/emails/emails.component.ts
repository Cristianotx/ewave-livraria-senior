import { Component, ViewChild, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';

import * as actions from './../../../../../store/actions';
import * as selectors from './../../../../../store/selectors';

import { CadastroBase } from 'src/app/shared/base/cadastro/cadastro.base';

import { Email } from 'src/app/shared/interfaces/email.interface';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
})
export class EmailsComponent extends CadastroBase {
  @ViewChild('modal') modal: ModalDirective;

  emails$: Observable<Email>;

  constructor(public injector: Injector) {
    super(injector);

    this.emails$ = this.store.select(selectors.selectEmails);

    this.store.select(selectors.selectEmailSelecionado).subscribe((email) => {
      this.patchValue(email);
    });
  }

  onInit() {}

  construirFormulario() {
    this.form = this.formBuilder.group({
      id: [null],
      tipoId: [null, Validators.required],
      endereco: [null, Validators.required],
    });
  }

  patchValue(email: Email) {
    if (email) {
      this.isEdicao = true;
      this.form.patchValue(email);
      this.abrirModal();
    }
  }

  salvar() {
    const model = this.form.getRawValue();
    this.fecharModal();
    if (this.isEdicao) {
      this.store.dispatch(actions.selecionarAlterarEmail({ email: model }));
    } else {
      this.store.dispatch(actions.selecionarNovoEmail({ email: model }));
    }
  }

  alterar(email: Email) {
    this.store.dispatch(actions.selecionarEmail({ email }));
  }

  remover(email: Email) {
    this.store.dispatch(actions.selecionarRemoverEmail({ email }));
  }

  cancelar() {
    this.form.reset();
    this.modal.hide();
  }

  abrirModal() {
    this.isEdicao = false;
    this.modal.show();
  }

  fecharModal() {
    this.submitted = false;
    this.form.reset();
    this.modal.hide();
  }
}
