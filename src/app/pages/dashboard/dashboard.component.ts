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
  public usuariosTotal: number = 1;
  public animaisTotal: any;
  public nextAgenda: any;
  public prevAgenda: any;
  public servicosTotal: any
  formatDate(dateString: string): string {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      throw new Error("Formato de data inválido. Esperado 'yyyy-mm-dd'.");
    }

    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  formatHours(time: string): string {
    // Valida o formato básico
    const regex = /^(\d{2}):(\d{2}):(\d{2})$/;
    const match = time.match(regex);

    if (!match) {
      throw new Error('Formato inválido. Use HH:MM:SS');
    }

    // Retorna apenas horas e minutos
    const [_, hours, minutes] = match;
    return `${hours}:${minutes}`;
  }
  countPet() {
    this.#apiService.getPetCount().subscribe(
      (response) => {
        this.animaisTotal = response;
        console.log('pets ',response);
        return response;
      },
      (err) => {
        console.log('Erro: ', err);
      }
    );
  }
  countUsuarios() {
    this.#apiService.getUsuariosCount().subscribe(
      (response) => {
        this.usuariosTotal = response.total;
        console.log(response);
        return response;
      },
      (err) => {
        console.log('Erro: ', err);
      }
    );
  }
  servicosCount() {
    this.#apiService.getServicosCount().subscribe(
      (response) => {
        console.log(response);
        this.servicosTotal = response;
      },
      (err) => {
        console.error('Erro: ', err);
      }
    );
  }
  getAgenda() {
    this.#apiService.getAgendaDashboard().subscribe(
      (response) => {
        this.nextAgenda = response.nextAgendamentos;
        this.prevAgenda = response.prevAgendamentos;
        console.log(response);
        return response;
      },
      (err) => {
        console.log('Erro: ', err);
      }
    );
  }
  ngOnInit(): void {
    this.countPet();
    this.countUsuarios();
    this.getAgenda();
    this.servicosCount()
  }
}
