import { Injectable, Injector } from '@angular/core';
import { HttpService } from '../base/service/http.service';

@Injectable({
  providedIn: 'root',
})
export class DropdownService extends HttpService<any> {
  constructor(injector: Injector) {
    super(injector, 'dropdown');
  }

  obterEstadosBrasileiros = () => this.get('estados-brasileiro');
  obterCidadesPorEstadoId = (estadoId: number) => this.get(`estados-brasileiro/${estadoId}/cidades`);
}
