import { Component, inject, OnInit } from '@angular/core';
import { DialogAgendamentoComponent } from '../../components/dialog/agendamento/dialog-agendamento/dialog-agendamento.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-agenda',
  imports: [],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss',
})
export class AgendaComponent implements OnInit {
  #apiService = inject(ApiService);

  public nextAgenda: any
  public prevAgenda: any
  public agenda: any
  constructor(private dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(DialogAgendamentoComponent),
      {
        width: '300px',
      };
  }
  loadAgenda() {
    this.#apiService.getAgenda().subscribe(
      (reponse) => {
        this.prevAgenda = reponse.prevAgendamentos;
        this.nextAgenda = reponse.nextAgendamentos;
        console.log('proximos', this.nextAgenda)
        console.log('ultimos', this.prevAgenda)
      },
      (err) => {
        console.error('Erro:', err);
      }
    );
    // this.#apiService.getAgendaNext().subscribe(
    //   (reponse) => {
    //     this.nextAgenda = reponse;
    //     console.log('proximos', this.nextAgenda)
    //   },
    //   (err) => {
    //     console.error('Erro:', err);
    //   }
    // );
    // this.#apiService.getAgendaPrev().subscribe(
    //   (reponse) => {
    //     this.prevAgenda = reponse;
    //     console.log('ultimos', this.prevAgenda)
    //   },
    //   (err) => {
    //     console.error('Erro:', err);
    //   }
    // );
  }
  ngOnInit(): void {
    this.loadAgenda();
  }
}
