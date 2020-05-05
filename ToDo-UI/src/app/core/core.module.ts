import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HandleErrorInterceptor } from './interceptors/handle-error.interceptor';

import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarNavComponent } from './layout/sidebar/sidebar-nav/sidebar-nav.component';
import { SidebarNavItemComponent } from './layout/sidebar/sidebar-nav/sidebar-nav-item/sidebar-nav-item.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent, SidebarNavComponent, SidebarNavItemComponent],
  imports: [CommonModule, BrowserModule, RouterModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleErrorInterceptor,
      multi: true,
    },
  ],
  exports: [LayoutComponent],
})
export class CoreModule {}
