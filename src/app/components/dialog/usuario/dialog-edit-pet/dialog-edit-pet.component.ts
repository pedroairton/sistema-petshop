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
  selector: 'app-dialog-edit-pet',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-edit-pet.component.html',
  styleUrl: './dialog-edit-pet.component.scss',
})
export class DialogEditPetComponent {
  form: FormGroup;
  readonly data = inject<any>(MAT_DIALOG_DATA);
  #apiService = inject(ApiService);
  constructor(
    private dialogRef: MatDialogRef<DialogEditPetComponent>,
    private fb: FormBuilder
  ) {
    console.log(this.data);
    this.form = this.fb.group({
      nome: [this.data.pet.nome, Validators.required],
      genero: [this.data.pet.genero, Validators.required],
      data_nascimento: [this.data.pet.data_nascimento, Validators.required],
      tipo_animal: [this.data.pet.tipo_animal, Validators.required],
      raca: [this.data.pet.raca, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      // this.dialogRef.close();
      this.updatePet();
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
  updatePet() {
    const petData = {
        ...this.form.value,
        id: this.data.pet.id,
      };
      console.log(petData)
    this.#apiService.atualizaPet(petData).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close()
      },
      (err) => {
        console.error('Erro: ', err);
      }
    );
  }
}
