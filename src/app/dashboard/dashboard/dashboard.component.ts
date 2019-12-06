import { ErrorHandlerService } from './../../core/error-handler.service';
import { PatiosService } from './../../patios/patios.service';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as moment from 'moment';

import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;
  totalVagas: string;
  diaRelatorio: string;
  patioSelecionado: any;
  patios = [];
  isPatioSelecionado = false;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private patioService: PatiosService,
    private errorHandler: ErrorHandlerService,
    private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.carregarPatios();
  }

  carregarPatios() {
    this.patioService.listarTodas()
      .then(patios => {
        this.patios = patios
          .map(p => ({ label: p.descricaoPatio, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  configurarGraficoPizza() {
    this.isPatioSelecionado = true;

    this.dashboardService.ticketsPorDia(this.patioSelecionado)
      .then(dados => {
        this.totalVagas = dados.vagas;
        this.diaRelatorio = moment(dados.dia).format('DD-MM-YYYY');
        this.pieChartData = {
          labels: ['Vagas Ocupadas','Vagas Disponiveis'],
          datasets: [
            {
              data: [dados.vagasOcupadas, dados.vagasLivres],
              backgroundColor: ['#109618', '#990099']
            }
          ]
        };
      });
  }
  carregarDados() {
    this.configurarGraficoPizza();

  }

}
