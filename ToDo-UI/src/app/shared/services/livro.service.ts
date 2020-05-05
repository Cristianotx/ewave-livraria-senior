import { Injectable, Injector } from '@angular/core';

import { HttpService } from '../base/service/http.service';
import { Livro } from '../interfaces/livro.interface';

@Injectable({
  providedIn: 'root',
})
export class LivroService extends HttpService<Livro> {
  constructor(injector: Injector) {
    super(injector, 'livro');
  }

  obterTodos = () => this.get();
  obterPorAggregateId = (aggregateId: string) => this.get(aggregateId);

  salvar = (body: Livro) => this.post(null, body);
  alterar = (aggregateId, body: Livro) => this.put(aggregateId, body);

  ativar = (aggregateId: string) => this.put(`${aggregateId}/ativar`, null);
  desativar = (aggregateId: string) => this.put(`${aggregateId}/desativar`, null);
}
