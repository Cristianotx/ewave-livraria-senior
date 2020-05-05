import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';

import { ToastrModule } from 'ngx-toastr';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './shared/components/layout/loading/loading.component';

import { RootStoreModule } from './store/root-store.module';

import { SharedModule } from './shared/shared.module';

import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    ToastrModule.forRoot(),
    RootStoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ModalModule.forRoot(),
  ],
  exports: [CoreModule, SharedModule],
  providers: [{ provide: BUCKET, useValue: environment.firebase.storageBucket }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
