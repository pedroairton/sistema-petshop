import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/Usuario';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DialogEditUsuarioComponent } from '../../components/dialog/usuarios/dialog-edit-usuario/dialog-edit-usuario.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-usuarios',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent implements OnInit {
  #apiService = inject(ApiService);
  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
  });
  constructor(private dialog: MatDialog) {}

  submitUser() {
    if (this.form.valid) {
      console.log(this.form);
      this.#apiService.createUsuario(this.form.value).subscribe(
        (response) => {
          console.log('Formulário enviado com sucesso', response);
          window.alert('Usuário Cadastrado');
          this.loadUsers();
        },
        (error) => {
          console.error('Erro:', error);
        },
      );
    } else {
      console.log('Form inválido');
    }
  }
  openDialogEdit(usuario: any) {
    (this.dialog.open(DialogEditUsuarioComponent, {
      data: { usuario },
    }),
      {
        minWidth: '1100px',
        maxWidth: '100%',
        width: '1600px',
      });
  }
  public usuarios: Usuario[] = [];
  public indexUsuarios: boolean = true;
  toggleUsuarios(value: boolean) {
    this.indexUsuarios = value;
  }
  loadUsers() {
    this.#apiService.getUsuarios().subscribe(
      (response) => {
        this.usuarios = response;
        console.log(this.usuarios);
      },
      (err) => {
        console.error('Erro:', err);
      },
    );
  }
  filterUser(event: Event): void {
    const inputValue = event.target as HTMLInputElement;
    console.log(inputValue.value);
    if (inputValue.value.length >= 3 || inputValue.value === '') {
      console.log('buscar!');
      this.#apiService.searchUsuario(inputValue.value).subscribe(
        (response) => {
          this.usuarios = response;
          console.log(this.usuarios);
        },
        (err) => {
          console.error('Erro:', err);
        },
      );
    }
  }
  deleteUser(idUsuario: number) {
    if (confirm('Deseja realmente excluir este usuário e seus pets?')) {
      this.#apiService.deletaUsuario(idUsuario).subscribe(
        (response) => {
          console.log('Usuário excluído com sucesso', response);
          window.alert('Usuário excluído com sucesso');
          this.loadUsers();
        },
        (err) => {
          console.error('Erro:', err);
        },
      );
    }
  }
  ngOnInit(): void {
    this.loadUsers();
  }
}
