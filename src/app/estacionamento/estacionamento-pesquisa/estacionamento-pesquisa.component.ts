import { Estacionamento } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { PatiosService } from '../../patios/patios.service';
import { EstacionamentoService, EstacionamentoFiltro } from '../estacionamento.service';

@Component({
  selector: 'app-estacionamento-pesquisa',
  templateUrl: './estacionamento-pesquisa.component.html',
  styleUrls: ['./estacionamento-pesquisa.component.css']
})
export class EstacionamentoPesquisaComponent implements OnInit {
  
  formulario: FormGroup;

  patios = [];
  estacionamentos = [];
  isPatioSelecionado = false;

  constructor(
    private estacionamentoService: EstacionamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private patioService: PatiosService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisar Veiculo no Estacionamento');
    this.configurarFormulario();
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

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      dataRelatorio: [],
      patio: this.formBuilder.group({
        codigo: [],
        descricaoPatio: []
      })
    });
  }

  pesquisar() {
    this.estacionamentoService.pesquisar(this.formulario.value)
      .then(resultado => {
        this.estacionamentos = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
