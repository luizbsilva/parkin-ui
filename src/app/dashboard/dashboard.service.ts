import { Injectable } from '@angular/core';

import 'rxjs/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboardUrl: string;

  constructor(private http: MoneyHttp) {
    this.dashboardUrl = `${environment.apiUrl}/dashboard`;
  }

  ticketsPorDia(codigoPatio): Promise<any> {
    return this.http.get<any>(`${this.dashboardUrl}/estatisticas/por-dia/${codigoPatio}`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
