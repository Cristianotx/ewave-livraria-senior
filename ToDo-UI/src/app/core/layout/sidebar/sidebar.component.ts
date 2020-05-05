import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as actions from './../../../store/actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menus: any;

  constructor(private store: Store) {
    this.store.dispatch(actions.carregarMenus());
  }

  ngOnInit(): void {}
}
