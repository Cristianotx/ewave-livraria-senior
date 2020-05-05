import { Injectable, Injector } from '@angular/core';

import { HttpService } from '../base/service/http.service';

import { Autor } from '../interfaces/autor.interface';

@Injectable({
  providedIn: 'root',
})
export class AutorService extends HttpService<Autor> {
  constructor(injector: Injector) {
    super(injector, 'autor');
  }

  obterTodos = () => this.get();
  obterTodosAtivos = () => this.get('ativos');
  salvar = (body: Autor) => this.post(null, body);
  alterar = (aggregateId: any, body: any) => this.put(aggregateId, body);
  ativar = (aggregateId: string) => this.put(`${aggregateId}/ativar`, null);
  desativar = (aggregateId: string) => this.put(`${aggregateId}/desativar`, null);
}
