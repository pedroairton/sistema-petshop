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

  public nextAgenda: any;
  public prevAgenda: any;
  public agenda: any;
  constructor(private dialog: MatDialog) {}
  openDialog(idPet: number) {
    this.dialog.open(DialogAgendamentoComponent, {
      data: {id: idPet}
    }),
      {
        width: '300px',
      };
  }
  loadAgenda() {
    this.#apiService.getAgenda().subscribe(
      (reponse) => {
        this.prevAgenda = reponse.prevAgendamentos;
        this.nextAgenda = reponse.nextAgendamentos;
        console.log('proximos', this.nextAgenda);
        console.log('ultimos', this.prevAgenda);
      },
      (err) => {
        console.error('Erro:', err);
      }
    );
  }
  formatDate(dateString: string): string {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      throw new Error("Formato de data inválido. Esperado 'yyyy-mm-dd'.");
    }

    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  ngOnInit(): void {
    this.loadAgenda();
  }
}
