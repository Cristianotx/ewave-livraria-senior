import { Component, Injector } from '@angular/core';

import * as actions from './../../../store/actions';
import * as selectors from './../../../store/selectors';

import { ConsultaBase } from 'src/app/shared/base/consulta/consulta-base';

import { InstituicaoDeEnsino } from '../../../shared/interfaces/instituicao-de-ensino.interface';

@Component({
  selector: 'app-instituicao-de-ensino-consulta',
  templateUrl: './instituicao-de-ensino-consulta.component.html',
  styleUrls: ['./instituicao-de-ensino-consulta.component.scss'],
})
export class InstituicaoDeEnsinoConsultaComponent extends ConsultaBase {
  constructor(injector: Injector) {
    super(injector);
    this.titulo = 'Instituições de Ensino';
    this.data$ = this.store.select(selectors.selectTodasInstituicoes);
  }

  onInit() {}

  realizarConsulta(pagina?: number) {
    this.beforeSubscribe(pagina);
    this.store.dispatch(actions.carregarTodasInstituicoes());
  }

  alterarSituacao(instituicao: InstituicaoDeEnsino) {
    const { aggregateId, ativo } = instituicao;
    const action = ativo ? actions.desativarInstituicao({ aggregateId }) : actions.ativarInstituicao({ aggregateId });
    this.store.dispatch(action);
  }

  cadastar() {
    this.store.dispatch(actions.limparInstituicao());
    this.router.navigate(['instituicoes-de-ensino', 'cadastrar']);
  }

  alterar = (instituicao: InstituicaoDeEnsino) => this.router.navigate(['instituicoes-de-ensino', instituicao.aggregateId, 'editar']);
}
