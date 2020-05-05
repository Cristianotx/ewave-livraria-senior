import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as selectors from './../../../../../store/selectors';
import * as actions from './../../../../../store/actions';

import { Menu } from 'src/app/shared/models/menu';

@Component({
  selector: 'app-sidebar-nav-item',
  templateUrl: './sidebar-nav-item.component.html',
  styleUrls: ['./sidebar-nav-item.component.scss'],
})
export class SidebarNavItemComponent implements OnInit {
  menus$: Observable<Menu[]>;

  constructor(private store: Store, private router: Router) {
    this.menus$ = store.pipe(select(selectors.selectMenus));
  }

  ngOnInit(): void {
    this.menus$.subscribe((menus) => {
      if (menus && menus.length > 0) {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
          const item = menus.find((menu) => menu.rota === this.router.url.split('/')[1]);
          this.store.dispatch(actions.alterarMenuSelecionado({ item }));
        });
      }
    });
  }

  itemSelecionado(item) {
    this.store.dispatch(actions.alterarMenuSelecionado({ item }));
    this.router.navigate([item.rota]);
  }
}
