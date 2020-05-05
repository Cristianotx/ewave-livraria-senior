import { Component, Injector } from '@angular/core';

import * as actions from './../../../store/actions';
import * as selectors from './../../../store/selectors';

import { ConsultaBase } from 'src/app/shared/base/consulta/consulta-base';

import { InstituicaoDeEnsino } from '../../../shared/interfaces/instituicao-de-ensino.interface';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';

@Component({
  selector: 'app-usuario-consulta',
  templateUrl: './usuario-consulta.component.html',
  styleUrls: ['./usuario-consulta.component.scss'],
})
export class UsuarioConsultaComponent extends ConsultaBase {
  constructor(injector: Injector) {
    super(injector);
    this.titulo = 'Usuários';
    this.data$ = this.store.select(selectors.selectTodosUsuarios);
  }

  onInit() {}

  realizarConsulta(pagina?: number) {
    this.beforeSubscribe(pagina);
    this.store.dispatch(actions.carregarTodosUsuarios());
  }

  alterarSituacao(usuario: Usuario) {
    const { aggregateId, ativo } = usuario;
    const action = ativo ? actions.desativarUsuario({ aggregateId }) : actions.ativarUsuario({ aggregateId });
    this.store.dispatch(action);
  }

  cadastar() {
    this.store.dispatch(actions.limparUsuario());
    this.router.navigate(['usuarios', 'cadastrar']);
  }

  alterar = (usuario: Usuario) => this.router.navigate(['usuarios', usuario.aggregateId, 'editar']);
}
