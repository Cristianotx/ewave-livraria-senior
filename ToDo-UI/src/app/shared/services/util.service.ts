import { Injectable, Injector } from '@angular/core';

import { HttpService } from '../base/service/http.service';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root',
})
export class UtilService extends HttpService<Menu> {
  constructor(public injector: Injector) {
    super(injector, null, 'assets/data');
  }

  getMenus = () => this.get('menus.json');

}
