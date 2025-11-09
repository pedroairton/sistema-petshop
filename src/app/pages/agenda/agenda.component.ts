import { Component, inject, OnInit } from '@angular/core';
import { DialogAgendamentoComponent } from '../../components/dialog/agendamento/dialog-agendamento/dialog-agendamento.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { DialogEditAgendamentoComponent } from '../../components/dialog/agendamento/dialog-edit-agendamento/dialog-edit-agendamento.component';

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
      data: { id: idPet },
    }),
      {
        width: '300px',
      };
  }
  openDialogEdit(agendamento: any) {
    this.dialog.open(DialogEditAgendamentoComponent, {
      data: { agendamento },
    }),
      {
        minWidth: '1100px',
        maxWidth: '100%',
        width: '1600px',
      };
  }
  loadAgenda() {
    this.#apiService.getAgenda().subscribe(
      (response) => {
        this.prevAgenda = response.prevAgendamentos;
        this.nextAgenda = response.nextAgendamentos;
        console.log('proximos', this.nextAgenda);
        console.log('ultimos', this.prevAgenda);
      },
      (err) => {
        console.error('Erro:', err);
      }
    );
  }
  marcaConcluido(idItem: number) {
    if (window.confirm('Deseja marcar este agendamento como concluído ?')) {
      console.log('Confirmou o id:', idItem);
      this.#apiService.concluiAgendamento(idItem).subscribe(
        (response) => {
          console.log(response);
          this.loadAgenda();
        },
        (err) => {
          console.error('Erro: ', err);
        }
      );
    } else {
      console.log('Não confirmou');
    }
  }
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
  ngOnInit(): void {
    this.loadAgenda();
  }
}
