import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  #apiService = inject(ApiService);
  public totalUsuarios: number = 54;
  public consultasHoje: {
    usuario: string;
    servico: string;
    horario_inicio: string;
  }[] = [
    {
      usuario: 'Roberto',
      servico: 'Consulta',
      horario_inicio: '12h30',
    },
    {
      usuario: 'Jonas',
      servico: 'Vacina',
      horario_inicio: '14h30',
    },
  ];
  public servicosTotal: {
    servico: string;
    total: number;
  }[] = [
    {
      servico: 'Banho',
      total: 38,
    },
    {
      servico: 'Tosa',
      total: 31,
    },
    {
      servico: 'Corte de unha',
      total: 20,
    },
    {
      servico: 'Vacina',
      total: 15,
    },
  ];
  public animaisTotal: any
  countPet(){
    this.#apiService.getPetCount().subscribe(
      response => {
        this.animaisTotal = response
        console.log(response)
        return response
      }, err => {
        console.log('Erro: ', err)
      }
    )
  }
  ngOnInit(): void {
    this.countPet()
  }
}
