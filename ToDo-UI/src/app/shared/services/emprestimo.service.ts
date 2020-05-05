import { Injectable, Injector } from '@angular/core';
import { HttpService } from '../base/service/http.service';

import { Emprestimo } from '../interfaces/emprestimo.interface';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService extends HttpService<Emprestimo> {
  constructor(injector: Injector) {
    super(injector, 'emprestimo');
  }

  obterTodos = () => this.get();

  salvar = (body: Emprestimo) => this.post(null, body);
  alterar = (aggregateId: any, body: any) => this.put(aggregateId, body);
}
