import { Component } from '@angular/core';

@Component({
  selector: 'app-servicos',
  imports: [],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss'
})
export class ServicosComponent {
public servicosTotal: {
    servico: string;
    total: number;
    status: string
  }[] = [
    {
      servico: 'Banho',
      total: 38,
      status: 'Ativo'
    },
    {
      servico: 'Tosa',
      total: 31,
      status: 'Ativo'
    },
    {
      servico: 'Corte de unha',
      total: 20,
      status: 'Inativo'
    },
    {
      servico: 'Vacina',
      total: 15,
      status: 'Ativo'
    },
  ];
}
