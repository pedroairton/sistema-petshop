import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-dialog-edit-usuario',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-edit-usuario.component.html',
  styleUrl: './dialog-edit-usuario.component.scss',
})
export class DialogEditUsuarioComponent {
  form: FormGroup;
  readonly data = inject<any>(MAT_DIALOG_DATA);
  #apiService = inject(ApiService);

  constructor(
    private dialogRef: MatDialogRef<DialogEditUsuarioComponent>,
    private fb: FormBuilder
  ) {
    console.log('data: ', this.data);
    this.form = this.fb.group({
      nome: [this.data.usuario.nome, Validators.required],
      email: [this.data.usuario.email, Validators.required],
      telefone: [this.data.usuario.telefone, Validators.required],
      endereco: [this.data.usuario.endereco, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      // this.dialogRef.close();
      this.updateUser();
    } else {
      console.log('Formulário incompleto');
      window.alert('Formulário incompleto');
    }
  }

  closeDialog() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.dialogRef.close;
    }
  }

  updateUser() {
    const userData = {
      ...this.form.value,
      id: this.data.usuario.id,
    };
    console.log(userData);
    this.#apiService.atualizaUsuario(userData).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close();
      },
      (err) => {
        console.error('Erro: ', err);
      }
    );
  }
}
