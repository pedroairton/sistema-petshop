import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
@Component({
  selector: 'app-dialog-agendar-pet',
  imports: [
    CommonModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-agendar-pet.component.html',
  styleUrl: './dialog-agendar-pet.component.scss',
})
export class DialogAgendarPetComponent implements OnInit {
  #apiService = inject(ApiService);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  public servicos: any;
  constructor(public dialogRef: MatDialogRef<DialogAgendarPetComponent>) {}
  form = new FormGroup({
    data_agendamento: new FormControl('', Validators.required),
    hora_agendamento: new FormControl('', Validators.required),
    id_servico: new FormControl('', Validators.required),
    descricao: new FormControl(''),
  });
  loadServicos() {
    this.#apiService.getServicos().subscribe(
      (response) => {
        this.servicos = response;
        console.log(this.servicos);
      },
      (err) => {
        console.error('Erro ', err);
      }
    );
  }
  ngOnInit(): void {
    this.loadServicos();
  }
  submitAgendamento() {
    if (this.form.valid) {
      console.log(this.form);
      const dataAgendamento = {
        ...this.form.value,
        id_pet: this.data.id,
      };
      this.#apiService.createAgendamento(dataAgendamento).subscribe(
        (response) => {
          console.log(response);
          window.alert('Agendamento realizado.');
          this.dialogRef.close()
        },
        (err) => {
          console.error('Erro ', err);
        }
      );
    }
  }
}
