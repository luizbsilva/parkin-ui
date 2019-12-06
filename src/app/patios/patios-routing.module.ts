import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { PatiosPesquisaComponent } from './patios-pesquisa/patios-pesquisa.component';
import { PatioCadastroComponent } from './patio-cadastro/patio-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: PatiosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PATIO'] }
  },
  {
    path: 'novo',
    component: PatioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PATIO'] }
  },
  {
    path: ':codigo',
    component: PatioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PATIO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PatiosRoutingModule { }
