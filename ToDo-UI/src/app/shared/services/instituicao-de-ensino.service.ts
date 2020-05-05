import { Injectable, Injector } from '@angular/core';
import { InstituicaoDeEnsino } from '../interfaces/instituicao-de-ensino.interface';
import { HttpService } from '../base/service/http.service';

@Injectable({
  providedIn: 'root',
})
export class InstituicaoDeEnsinoService extends HttpService<InstituicaoDeEnsino> {
  constructor(injector: Injector) {
    super(injector, 'instituicao-de-ensino');
  }

  obterTodos = () => this.get();
  obterTodosAtivos = () => this.get('ativos');

  obterPorId = (id: number) => this.get(`${id}`);
  obterPorAggregateId = (aggregateId: string) => this.get(aggregateId);

  salvar = (body: InstituicaoDeEnsino) => this.post(null, body);
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
