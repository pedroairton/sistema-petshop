import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  #apiService = inject(ApiService);

  public usuarios: Usuario[] = []
  public indexUsuarios: boolean = true;
  toggleUsuarios(value: boolean) {
    this.indexUsuarios = value;
  }
  loadUsers(){
    this.#apiService.getUsuarios().subscribe(
      (response) => {
        this.usuarios = response;
        console.log(this.usuarios);
      },
      (err) => {
        console.error('Erro:', err);
      })
  }
  ngOnInit(): void {
    this.loadUsers()
  }
}
