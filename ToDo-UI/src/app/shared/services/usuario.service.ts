import { Injectable, Injector } from '@angular/core';

import { HttpService } from '../base/service/http.service';

import { Usuario } from '../interfaces/usuario.interface';
import { Email } from '../interfaces/email.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends HttpService<Usuario> {
  constructor(injector: Injector) {
    super(injector, 'usuario');
  }

  obterTodos = () => this.get();
  obterTodosAtivos = () => this.get('ativos');

  obterPorId = (id: number) => this.get(`${id}`);
  obterPorAggregateId = (aggregateId: string) => this.get(aggregateId);

  salvar = (body: Usuario) => this.post(null, body);
  alterar = (aggregateId: any, body: any) => this.put(aggregateId, body);

  ativar = (aggregateId: string) => this.put(`${aggregateId}/ativar`, null);
  desativar = (aggregateId: string) => this.put(`${aggregateId}/desativar`, null);

  adicionarEmail = (aggregateId: string, body: any) => this.post(`${aggregateId}/email`, body);
  alterarEmail = (aggregateId: string, emailId: number, body: any) => this.post(`${aggregateId}/email/${emailId}`, body);
  removerEmail = (aggregateId: string, emailId: number) => this.delete(`${aggregateId}/email/${emailId}`, null);

  adicionarTelefone = (aggregateId: string, body: any) => this.post(`${aggregateId}/telefone`, body);
  alterarTelefone = (aggregateId: string, telefoneId: number, body: any) => this.post(`${aggregateId}/telefone/${telefoneId}`, body);
  removerTelefone = (aggregateId: string, telefoneId: number) => this.delete(`${aggregateId}/telefone/${telefoneId}`, null);
}
