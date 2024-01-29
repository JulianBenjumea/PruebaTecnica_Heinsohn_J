import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './registro/registro.component';
import { ListaTareasComponent } from './tareas/lista-tareas.component';
import { TareasComponent } from './/tareas/tareas.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegistroComponent, ListaTareasComponent, TareasComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, MaterialModule, FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'login', component: LoginComponent },
      { path: 'lista-tareas', component: ListaTareasComponent },
      { path: 'tareas', component: ListaTareasComponent }
    ])
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
