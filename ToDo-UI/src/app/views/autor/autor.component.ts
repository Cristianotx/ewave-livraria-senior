import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import * as actions from './../../store/actions';
import * as selectors from './../../store/selectors';

import { ConsultaBase } from 'src/app/shared/base/consulta/consulta-base';

import { Autor } from 'src/app/shared/interfaces/autor.interface';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss'],
})
export class AutorComponent extends ConsultaBase {
  @ViewChild('modal') modal: ModalDirective;

  form: FormGroup;

  editar = false;
  submitted = false;

  constructor(injector: Injector) {
    super(injector);
    this.titulo = 'Autores';
    this.data$ = this.store.select(selectors.selectTodosAutores);
  }

  onInit() {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
    });
  }

  realizarConsulta(pagina?: number) {
    this.beforeSubscribe(pagina);
    this.store.dispatch(actions.carregarTodosAutores());
  }

  alterarSituacao(autor: Autor) {
    const { aggregateId, ativo } = autor;
    const action = ativo ? actions.desativarAutor({ aggregateId }) : actions.ativarAutor({ aggregateId });
    this.store.dispatch(action);
  }

  submit() {
    if (this.form.valid) {
      this.submitted = false;
      this.salvar();
    }

    this.submitted = true;
  }

  async salvar() {
    const model = this.form.getRawValue();
    const action = this.editar ? actions.alterarAutor({ autor: model }) : actions.salvarAutor({ autor: model });
    await this.store.dispatch(action);
    this.fecharModal();
  }

  abrirModal(autor?: Autor) {
    if (autor) {
      const { aggregateId, nome } = autor;

      this.editar = true;
      this.form.get('nome').setValue(nome);
      this.store.dispatch(actions.selecionarAutor({ aggregateId }));
    } else {
      this.editar = false;
      this.form.reset();
    }

    this.modal.show();
  }

  fecharModal() {
    this.submitted = false;
    this.form.reset();
    this.modal.hide();
  }
}
