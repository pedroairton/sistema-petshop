import { Component } from '@angular/core';
import { DialogAtendimentosPetComponent } from '../../components/dialog/usuario/dialog-atendimentos-pet/dialog-atendimentos-pet.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
})
export class UsuarioComponent {
  constructor(private dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(DialogAtendimentosPetComponent),
      {
        minWidth: '1100px',
        maxWidth: '100%',
        width: '1600px',
      };
  }
}
