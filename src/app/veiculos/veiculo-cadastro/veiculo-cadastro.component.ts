import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { Veiculo } from '../../core/model';
import { VeiculoService } from '../veiculo.service';

@Component({
  selector: 'app-veiculo-cadastro',
  templateUrl: './veiculo-cadastro.component.html',
  styleUrls: ['./veiculo-cadastro.component.css']
})
export class VeiculoCadastroComponent implements OnInit {

  veiculo = new Veiculo();
  marcas: any[];
  marcaSelecionada: number;

  constructor(
    private veiculoService: VeiculoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoVeiculo = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Veiculo');
    this.carregarMarcas();

    if (codigoVeiculo) {
      this.carregarVeiculo(codigoVeiculo);
    }
  }

  carregarMarcas() {
    this.veiculoService.listarMarcas().then(lista => {
      this.marcas = lista.map(marca => ({ label: marca.nome, value: marca.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.veiculo.codigo);
  }

  carregarVeiculo(codigo: number) {
    this.veiculoService.buscarPorCodigo(codigo)
      .then(request => {
        this.veiculo = request;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarVeiculo(form);
    } else {
      this.adicionarVeiculo(form);
    }
  }

  adicionarVeiculo(form: FormControl) {
    debugger
    this.veiculoService.adicionar(this.veiculo)
      .then(pessoaAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Veiculo adicionada com sucesso!' });
        this.router.navigate(['/veiculos', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarVeiculo(form: FormControl) {
    this.veiculoService.atualizar(this.veiculo)
      .then(request => {
        this.veiculo = request;

        this.messageService.add({ severity: 'success', detail: 'Veiculo alterada com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.veiculo = new Veiculo();
    }.bind(this), 1);

    this.router.navigate(['/veiculos/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Veiculo: ${this.veiculo.modeloVeiculo}`);
  }

}
