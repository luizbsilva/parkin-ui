import { EstacionamentoPesquisaComponent } from './estacionamento-pesquisa/estacionamento-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { EstacionamentoCadastroComponent } from './estacionamento-cadastro/estacionamento-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: EstacionamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ESTACIONAMENTO'] }
  },
  {
    path: 'pesquisar',
    component: EstacionamentoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ESTACIONAMENTO'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EstacionamentoRoutingModule { }
