import { Estacionamento } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { PatiosService } from '../../patios/patios.service';
import { EstacionamentoService } from '../estacionamento.service';

@Component({
  selector: 'app-estacionamento-cadastro',
  templateUrl: './estacionamento-cadastro.component.html',
  styleUrls: ['./estacionamento-cadastro.component.css']
})
export class EstacionamentoCadastroComponent implements OnInit {

  formulario: FormGroup;
  patios = [];
  vagas: any;
  vagasDisponiveis: any;
  isPatioSelecionado = false;
  isHorarioChegada = false;

  constructor(
    private estacionamentoService: EstacionamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private patioService: PatiosService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Adicionar Veiculo no Estacionamento');
    this.configurarFormulario();
    this.carregarPatios();

  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      placaVeiculo: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      dataEntrada: [null, Validators.required],
      horarioChegada: [null, Validators.required],
      horarioSaida: [],
      valorPeriodo: [],
      tempoPermanencia: [],
      patio: this.formBuilder.group({
        codigo: [],
        descricaoPatio: []
      })
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  carregarPatios() {
    this.patioService.listarTodas()
      .then(patios => {
        this.patios = patios
          .map(p => ({ label: p.descricaoPatio, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarNumeroDeVagas() {
    this.estacionamentoService.buscarNumeroDeVagas(this.formulario.get('patio.codigo').value)
      .then(vagasDisponiveis => {
        this.isPatioSelecionado = true;
        this.vagasDisponiveis = vagasDisponiveis;
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  carregarDadosEstacionamento() {
    this.estacionamentoService.pesquisarVeiculoEstacionado(this.formulario.get('placaVeiculo').value)
      .then(carroEstacionado => {
        if (carroEstacionado) {
          this.formulario.patchValue(carroEstacionado);
          this.isPatioSelecionado = true;
          this.isHorarioChegada = true;
        }
      });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizarEstacionamento();
    } else {
      this.adicionarEstacionamento();
    }
  }

  adicionarEstacionamento() {
    this.estacionamentoService.adicionar(this.formulario.value)
      .then(ticketAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Estacionamento criado com sucesso!' });
        this.novo();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarEstacionamento() {
    if (Boolean(this.formulario.get('horarioSaida').value)) {

    this.estacionamentoService.atualizar(this.formulario.value)
      .then(patio => {
        this.formulario.patchValue(patio);
        this.messageService.add({ severity: 'success', detail: 'Calculo de Vaiculo Realizado' });
      })
      .catch(erro => this.errorHandler.handle(erro));
    } else {
      this.messageService.add({ severity: 'error', detail: 'Insira o Horario Final!' });
    }
  }

  novo() {
    this.formulario.reset();

    this.isPatioSelecionado = false;
    this.isHorarioChegada = false;

    setTimeout(function() {
      this.estacionamento = new Estacionamento();
    }.bind(this), 1);

    this.router.navigate(['/estacionamento']);

  }

}
