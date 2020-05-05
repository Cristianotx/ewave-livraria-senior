import { Component, Injector, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import * as actions from './../../../../store/actions';
import * as selectors from './../../../../store/selectors';

import { CadastroBase } from 'src/app/shared/base/cadastro/cadastro.base';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';

@Component({
  selector: 'app-emprestimo-cadastro',
  templateUrl: './emprestimo-cadastro.component.html',
  styleUrls: ['./emprestimo-cadastro.component.scss'],
})
export class EmprestimoCadastroComponent extends CadastroBase {
  @ViewChild('modal') modal: ModalDirective;

  livros$: Observable<any>;
  usuarios$: Observable<any>;

  carregarListaLivros = false;

  constructor(public injector: Injector) {
    super(injector);
  }

  onInit() {
    this.usuarios$ = this.store.select(selectors.selectTodosUsuarios);
    this.store.dispatch(actions.carregarTodosUsuarios());

    this.livros$ = this.store.select(selectors.selectTodosLivros);
    this.store.dispatch(actions.carregarTodosLivros());

    this.store.select(selectors.selectLivroId).subscribe((id) => this.setValueLivroId(id));
    this.store.select(selectors.selectModalEmprestimoVisivel).subscribe((visivel) => this.modalChange(visivel));
    this.store.select(selectors.selectEmprestimoSelecionado).subscribe((emprestimo) => this.patchValue(emprestimo));
  }

  construirFormulario() {
    this.form = this.formBuilder.group({
      dataEmprestimo: [null, Validators.required],
      dataVencimento: [null, Validators.required],
      livroId: [null, Validators.required],
      usuarioId: [null, Validators.required],
    });
  }

  patchValue(emprestimo: any) {
    if (emprestimo) {
      this.form.patchValue(emprestimo);
      this.store.dispatch(actions.abrirModalEmprestimo());
    }
  }

  async salvar() {
    const model = this.form.getRawValue();
    const action = this.isEdicao
      ? actions.alterarEmprestimo({ emprestimo: model })
      : actions.salvarEmprestimo({ emprestimo: model });

    await this.store.dispatch(action);
    this.store.dispatch(actions.fecharModalEmprestimo());

    if (this.carregarListaLivros) {
      this.store.dispatch(actions.carregarTodosLivros());
    }
  }

  modalChange(visivel) {
    if (visivel != null) {
      if (visivel) {
        this.abrirModal();
      } else {
        this.fecharModal();
      }
    }
  }

  setValueLivroId(id: number) {
    if (id) {
      this.carregarListaLivros = true;
      this.form?.get('livroId').setValue(id);
    } else {
      this.carregarListaLivros = false;
      this.store.dispatch(actions.limparLivroId());
    }
  }

  cancelar = () => this.store.dispatch(actions.fecharModalEmprestimo());

  abrirModal() {
    this.modal.show();
  }

  fecharModal() {
    this.submitted = false;
    this.form.reset();
    this.modal.hide();
  }
}
