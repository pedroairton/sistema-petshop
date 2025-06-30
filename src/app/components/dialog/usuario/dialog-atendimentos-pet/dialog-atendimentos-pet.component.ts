import { Component, inject, OnInit } from '@angular/core';
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
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-dialog-atendimentos-pet',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-atendimentos-pet.component.html',
  styleUrl: './dialog-atendimentos-pet.component.scss',
})
export class DialogAtendimentosPetComponent implements OnInit {
  form: FormGroup;
  #apiService = inject(ApiService);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DialogAtendimentosPetComponent>);
  public agendamentos: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.dialogRef.close();
    }
  }

  closeDialog() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.dialogRef.close;
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
  formatTimestampToDate(input: string): string {
    const date = new Date(input);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }
  loadAtendimentos() {
    this.#apiService.getPetAgenda(this.data.id).subscribe(
      (response) => {
        console.log(response);
        this.agendamentos = response;
      },
      (err) => {
        console.error('Erro: ', err);
      }
    );
  }
  ngOnInit(): void {
    this.loadAtendimentos();
  }
}
