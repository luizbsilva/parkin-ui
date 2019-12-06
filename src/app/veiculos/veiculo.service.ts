import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Veiculo, MarcaVeiculo } from '../core/model';
import { MoneyHttp } from '../seguranca/money-http';

export class VeiculoFiltro {
  modelo: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class VeiculoService {

  veiculosUrl: string;
  marcaVeiculoUrl: string;

  constructor(private http: MoneyHttp) {
    this.veiculosUrl = `${environment.apiUrl}/veiculos`;
    this.marcaVeiculoUrl = `${environment.apiUrl}/marcas`;
  }

  pesquisar(filtro: VeiculoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.modelo) {
      params = params.append('nome', filtro.modelo);
    }

    return this.http.get<any>(`${this.veiculosUrl}`, { params })
      .toPromise()
      .then(response => {
        const veiculos = response.content;

        const resultado = {
          veiculos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.veiculosUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.veiculosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.put(`${this.veiculosUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(veiculo: Veiculo): Promise<Veiculo> {
    return this.http.post<Veiculo>(this.veiculosUrl, veiculo)
      .toPromise();
  }

  atualizar(veiculo: Veiculo): Promise<Veiculo> {
    return this.http.put<Veiculo>(`${this.veiculosUrl}/${veiculo.codigo}`, veiculo)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Veiculo> {
    return this.http.get<Veiculo>(`${this.veiculosUrl}/${codigo}`)
      .toPromise();
  }

  listarMarcas(): Promise<MarcaVeiculo[]> {
    return this.http.get<MarcaVeiculo[]>(this.marcaVeiculoUrl).toPromise();
  }

}
