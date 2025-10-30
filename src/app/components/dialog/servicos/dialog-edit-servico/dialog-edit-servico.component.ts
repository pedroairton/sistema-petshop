import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-servico',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-edit-servico.component.html',
  styleUrl: './dialog-edit-servico.component.scss',
})
export class DialogEditServicoComponent {
  form: FormGroup;
  readonly data = inject<any>(MAT_DIALOG_DATA);
  #apiService = inject(ApiService);

  constructor(
    private dialogRef: MatDialogRef<DialogEditServicoComponent>,
    private fb: FormBuilder
  ) {
    console.log('data: ', this.data);
    this.form = this.fb.group({
      nome_servico: [this.data.servico.nome_servico, Validators.required],
    });
  }

  closeDialog() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.dialogRef.close;
    }
  }

  submit() {
    if (this.form.valid) {
      // this.dialogRef.close();
      this.updateServico();
    } else {
      console.log('Formulário incompleto');
      window.alert('Formulário incompleto');
    }
  }

  updateServico() {
    const servicoData = {
      ...this.form.value,
      id: this.data.servico.id,
    };
    console.log(servicoData);
    this.#apiService.atualizaServico(servicoData).subscribe(
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
