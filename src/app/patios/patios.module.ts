import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from '../shared/shared.module';
import { PatiosRoutingModule } from './patios-routing.module';
import { PatioCadastroComponent } from './patio-cadastro/patio-cadastro.component';
import { PatiosPesquisaComponent } from './patios-pesquisa/patios-pesquisa.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    PatioCadastroComponent,
    PatiosPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    ProgressSpinnerModule,

    SharedModule,
    PatiosRoutingModule
  ]
})
export class PatiosModule { }
