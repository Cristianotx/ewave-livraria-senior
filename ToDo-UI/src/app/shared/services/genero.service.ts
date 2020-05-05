import { Injectable, Injector } from '@angular/core';

import { HttpService } from '../base/service/http.service';

import { Genero } from '../interfaces/genero.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneroService extends HttpService<Genero> {
  constructor(injector: Injector) {
    super(injector, 'genero');
  }

  obterTodos = () => this.get();
  obterTodosAtivos = () => this.get('ativos');
  salvar = (body: Genero) => this.post(null, body);
  alterar = (aggregateId: any, body: any) => this.put(aggregateId, body);
  ativar = (aggregateId: string) => this.put(`${aggregateId}/ativar`, null);
  desativar = (aggregateId: string) => this.put(`${aggregateId}/desativar`, null);
}
