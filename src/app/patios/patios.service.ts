import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';
import { Patio } from '../core/model';

export class PatioFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PatiosService {

  patioUrl: string;

  constructor(private http: MoneyHttp) {
    this.patioUrl = `${environment.apiUrl}/patios`;
  }

  pesquisar(filtro: PatioFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      params = params.append('nome', filtro.descricao);
    }

    return this.http.get<any>(`${this.patioUrl}`, { params })
      .toPromise()
      .then(response => {
        const patios = response.content;

        const resultado = {
          patios,
          total: response.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(`${this.patioUrl}/buscar-todos`)
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.patioUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(patio: Patio): Promise<Patio> {
    return this.http.post<Patio>(this.patioUrl, patio)
      .toPromise();
  }

  atualizar(patio: Patio): Promise<Patio> {
    return this.http.put<Patio>(`${this.patioUrl}/${patio.codigo}`, patio)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Patio> {
    return this.http.get<Patio>(`${this.patioUrl}/${codigo}`)
      .toPromise();
  }

  buscarNumeroDeVagas(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.patioUrl}/vagas-disponiveis/${codigo}`)
      .toPromise()
      .then(response => response);

  }
}
