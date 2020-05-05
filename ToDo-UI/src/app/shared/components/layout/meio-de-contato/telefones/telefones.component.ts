import { Component, ViewChild, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import * as actions from './../../../../../store/actions';
import * as selectors from './../../../../../store/selectors';

import { ModalDirective } from 'ngx-bootstrap/modal/public_api';

import { Telefone } from 'src/app/shared/interfaces/telefone.interface';
import { CadastroBase } from 'src/app/shared/base/cadastro/cadastro.base';

@Component({
  selector: 'app-telefones',
  templateUrl: './telefones.component.html',
  styleUrls: ['./telefones.component.scss'],
})
export class TelefonesComponent extends CadastroBase {
  @ViewChild('modal') modal: ModalDirective;

  telefones$: Observable<Telefone>;

  constructor(public injector: Injector) {
    super(injector);

    this.telefones$ = this.store.select(selectors.selectTelefones);

    this.store.select(selectors.selectTelefoneSelecionado).subscribe((telefone) => {
      this.patchValue(telefone);
    });
  }

  onInit() {}

  construirFormulario() {
    this.form = this.formBuilder.group({
      id: [null],
      tipoId: [null, Validators.required],
      numero: [null, Validators.required],
    });
  }

  patchValue(telefone: Telefone) {
    if (telefone) {
      this.isEdicao = true;
      this.form.patchValue(telefone);
      this.abrirModal();
    }
  }

  salvar() {
    const model = this.form.getRawValue();
    this.fecharModal();
    if (this.isEdicao) {
      this.store.dispatch(actions.selecionarAlterarTelefone({ telefone: model }));
    } else {
      this.store.dispatch(actions.selecionarNovoTelefone({ telefone: model }));
    }
  }

  alterar(telefone: Telefone) {
    this.store.dispatch(actions.selecionarTelefone({ telefone }));
  }

  remover(telefone: Telefone) {
    this.store.dispatch(actions.selecionarRemoverTelefone({ telefone }));
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
