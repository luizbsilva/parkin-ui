import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { VeiculosPesquisaComponent } from './veiculos-pesquisa/veiculos-pesquisa.component';
import { VeiculoCadastroComponent } from './veiculo-cadastro/veiculo-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: VeiculosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_VEICULO'] }
  },
  {
    path: 'novo',
    component: VeiculoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_VEICULO'] }
  },
  {
    path: ':codigo',
    component: VeiculoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_VEICULO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VeiculosRoutingModule { }
