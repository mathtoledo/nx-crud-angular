import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import {ListaComponent} from "./lista/lista.component";
import {DialogFormColaboradorComponent} from "./dialog-form-colaborador/dialog-form-colaborador.component";
import {ColaboradorRoutingModule} from "./colaboradors-routing.module";


@NgModule({
  declarations: [
    ListaComponent,
    DialogFormColaboradorComponent
  ],
  imports: [
    CommonModule,
    ColaboradorRoutingModule,
    AppMaterialModule,
  ]
})
export class ColaboradorsModule { }
