import { Estacionamento } from './../core/model';
import { Injectable } from '@angular/core';
import { MoneyHttp } from '../seguranca/money-http';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import { Patio } from '../core/model';

export class EstacionamentoFiltro {
  patio = new Patio();
  data: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EstacionamentoService {

  estacionamentoUrl: string;

  constructor(private http: MoneyHttp) {
    this.estacionamentoUrl = `${environment.apiUrl}/estacioinamento`;
  }

  pesquisar(filtro: EstacionamentoFiltro): Promise<any> {

    return this.http.post<any>(`${this.estacionamentoUrl}/buscar-estacionamento`, filtro)
      .toPromise()
      .then(response => {
        const patios = response;

        return patios;
      });
  }

  buscarNumeroDeVagas(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.estacionamentoUrl}/vagas-disponiveis/${codigo}`)
      .toPromise()
      .then(response => response);

  }

  adicionar(estacionamento: Estacionamento): Promise<Estacionamento> {
    return this.http.post<Estacionamento>(this.estacionamentoUrl, estacionamento)
      .toPromise();
  }

  atualizar(estacionamento: Estacionamento): Promise<Estacionamento> {
    return this.http.put<Estacionamento>(`${this.estacionamentoUrl}/${estacionamento.codigo}`, estacionamento)
      .toPromise()
      .then(response => {
        if (response) {
          const carroEstacionado = response;
          this.converterStringsParaDatas(carroEstacionado);
        }

        return response;
      });
  }

  pesquisarVeiculoEstacionado(placaVeiculo: string): Promise<any> {
    let params = new HttpParams();

    if (placaVeiculo) {
      params = params.append('placaVeiculo', placaVeiculo);
    }
    return this.http.get<any>(`${this.estacionamentoUrl}`, { params })
      .toPromise()
      .then(response => {
        if (response) {
          const carroEstacionado = response;
          this.converterStringsParaDatas(carroEstacionado);
        }

        return response;
      });
  }

  private converterStringsParaDatas(estacionamento: Estacionamento) {
    estacionamento.dataEntrada = moment(estacionamento.dataEntrada,
      'YYYY-MM-DD').toDate();
  }
}
