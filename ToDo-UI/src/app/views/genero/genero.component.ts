import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

import { ConsultaBase } from 'src/app/shared/base/consulta/consulta-base';
import { Genero } from 'src/app/shared/interfaces/genero.interface';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss'],
})
export class GeneroComponent extends ConsultaBase {
  @ViewChild('modal') modal: ModalDirective;

  form: FormGroup;

  editar = false;
  submitted = false;

  constructor(injector: Injector) {
    super(injector);
    this.titulo = 'Gêneros';
    this.data$ = this.store.select(selectors.selectGenerosCarregados);
  }

  onInit() {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
    });
  }

  realizarConsulta(pagina?: number) {
    this.beforeSubscribe(pagina);
    this.store.dispatch(actions.carregarTodosGeneros());
  }

  alterarSituacao(genero: Genero) {
    const { aggregateId, ativo } = genero;
    const action = ativo ? actions.desativarGenero({ aggregateId }) : actions.ativarGenero({ aggregateId });
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
    const action = this.editar ? actions.alterarGenero({ genero: model }) : actions.salvarGenero({ genero: model });
    await this.store.dispatch(action);
    this.fecharModal();
  }

  abrirModal(genero?: Genero) {
    if (genero) {
      const { aggregateId, nome } = genero;

      this.editar = true;
      this.form.get('nome').setValue(nome);
      this.store.dispatch(actions.selecionarGenero({ aggregateId }));
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
