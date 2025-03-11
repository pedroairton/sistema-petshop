import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
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
  public indexUsuarios: boolean = true;
  toggleUsuarios(value: boolean) {
    this.indexUsuarios = value;
  }
}
