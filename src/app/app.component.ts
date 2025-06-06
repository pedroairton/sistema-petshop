import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiService } from './services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { DialogFormUsuarioComponent } from './components/dialog/usuario/dialog-form-usuario/dialog-form-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  panelOpenState = false;
  title: string = 'petshop';
  public mobile: boolean = false;

  constructor(private dialog: MatDialog) {}
  openDialog(){
    this.dialog.open(DialogFormUsuarioComponent), {
      width: '300px'
    }
  }
  toggleMobile() {
    this.mobile === true ? (this.mobile = false) : (this.mobile = true);
  }
  public indexUsuarios: boolean = true;
  toggleUsuarios(value: boolean) {
    this.indexUsuarios = value;
  }
  public consultasHoje: {
    usuario: string;
    servico: string;
    horario_inicio: string;
  }[] = [
    {
      usuario: 'Robertinho',
      servico: 'Consulta',
      horario_inicio: '12h30',
    },
    {
      usuario: 'Jonas',
      servico: 'Vacina',
      horario_inicio: '14h30',
    },
  ];
  public totalUsuarios: number = 54;
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
  public animaisTotal: { tipo: string; total: number }[] = [
    {
      tipo: 'Gato',
      total: 56,
    },
    {
      tipo: 'Cachorro',
      total: 47,
    },
  ];
  public usuarios: {
    nome: string;
    email: string;
    numero: string;
    endereco: string;
    pets: number;
  }[] = [
    {
      nome: 'Robertinho',
      email: 'robertinho@inho.com',
      numero: '81995473367',
      endereco: 'Rua ablueble',
      pets: 3,
    },
    {
      nome: 'Voldemort',
      email: 'voldi@morti.com',
      numero: '81982473367',
      endereco: 'Rua cringe',
      pets: 2,
    },
  ];
}
