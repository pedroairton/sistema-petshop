import { Component } from '@angular/core';
import { DialogAgendamentoComponent } from '../../components/dialog/agendamento/dialog-agendamento/dialog-agendamento.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agenda',
  imports: [],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss',
})
export class AgendaComponent {
  constructor(private dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(DialogAgendamentoComponent),
      {
        width: '300px',
      };
  }
}
