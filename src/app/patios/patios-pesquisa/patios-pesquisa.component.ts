import { Component, OnInit, ViewChild } from '@angular/core';
import { PatiosService, PatioFiltro } from '../patios.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-patios-pesquisa',
  templateUrl: './patios-pesquisa.component.html',
  styleUrls: ['./patios-pesquisa.component.css']
})
export class PatiosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PatioFiltro();
  patios = [];
  @ViewChild('tabela') grid;

  constructor(
    private patioService: PatiosService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de patios');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.patioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.patios = resultado.patios;
        console.log(this.patios);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(veiculo: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(veiculo);
      }
    });
  }

  excluir(veiculo: any) {
    this.patioService.excluir(veiculo.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Patio excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
