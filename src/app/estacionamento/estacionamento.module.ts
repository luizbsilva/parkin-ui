import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';

import { SharedModule } from '../shared/shared.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EstacionamentoCadastroComponent } from './estacionamento-cadastro/estacionamento-cadastro.component';
import { EstacionamentoRoutingModule } from './estacionamento-routing.module';
import { EstacionamentoPesquisaComponent } from './estacionamento-pesquisa/estacionamento-pesquisa.component';

@NgModule({
  declarations: [
    EstacionamentoCadastroComponent,
    EstacionamentoPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    ProgressSpinnerModule,
    InputMaskModule,

    SharedModule,
    EstacionamentoRoutingModule
  ]
})
export class EstacionamentoModule { }
