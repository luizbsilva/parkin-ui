import { Patio } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { PatiosService } from '../patios.service';

@Component({
  selector: 'app-patio-cadastro',
  templateUrl: './patio-cadastro.component.html',
  styleUrls: ['./patio-cadastro.component.css']
})
export class PatioCadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private patioService: PatiosService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const codigoPatio = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Pátio');

    if (codigoPatio) {
      this.carregarPatio(codigoPatio);
    }

  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      descricaoPatio: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      numeroDeVagas: [null, [ this.validarObrigatoriedade]],
      taxaHora: [ null, Validators.required ],
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

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarPatio(codigo: number) {
    this.patioService.buscarPorCodigo(codigo)
      .then(patio => {
        this.formulario.patchValue(patio);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarPatio();
    } else {
      this.adicionarPatio();
    }
  }

  adicionarPatio() {
    this.patioService.adicionar(this.formulario.value)
      .then(ticketAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Patio adicionado com sucesso!' });

        this.router.navigate(['/patios', ticketAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPatio() {
    this.patioService.atualizar(this.formulario.value)
      .then(patio => {
        this.formulario.patchValue(patio);

        this.messageService.add({ severity: 'success', detail: 'Patio alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.patio = new Patio();
    }.bind(this), 1);

    this.router.navigate(['/patios/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de patio: ${this.formulario.get('descricaoPatio').value}`);
  }

}
