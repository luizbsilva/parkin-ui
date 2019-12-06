import { Time } from '@angular/common';

export class Estado {
  codigo: number;
  nome: string;
}

export class Cidade {
  codigo: number;
  nome: string;
  estado = new Estado();
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();
}

export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(codigo?: number,
    nome?: string,
    email?: string,
    telefone?: string) {
      this.codigo = codigo;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
  }
}

export class Pessoa {
  codigo: number;
  nome: string;
  cpf: string;
  endereco = new Endereco();
  ativo = true;
  contatos = new Array<Contato>();
}

export class Categoria {
  codigo: number;
}


export class Usuario {
  codigo: number;
  nome: string;
  mail: string;
  senha: string;
  tipo: string;
  ativo = true;
}

export class Permissao {
  codigo: number;
  nome: string;
  ativo: boolean;
}

export class Permissoes {
  permissoes = [];
  usuario = new Usuario();
}

export class MarcaVeiculo {
  codigo: number;
  nome: string;
  atibo: boolean;
}

export class Veiculo {
  codigo: number;
  placaVeiculo: string;
  corVeiculo: string;
  modeloVeiculo: string;
  marcaVeiculo = new MarcaVeiculo();
}

export class Patio {
  codigo: number;
  descricaoPatio: string;
  numeroDeVagas: any;
  taxaHora: any;
}

export class Estacionamento {
  codigo: number;
  dataEntrada: Date;
  horarioChegada: Time;
  horarioSaida: Time;
  valorPeriodo: number;
  tempoPermanencia: number;
  placaVeiculo: string;
  patio = new Patio();
}


