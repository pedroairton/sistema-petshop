import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-agendamento',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-edit-agendamento.component.html',
  styleUrl: './dialog-edit-agendamento.component.scss',
})
export class DialogEditAgendamentoComponent implements OnInit{
  form: FormGroup;
  readonly data = inject<any>(MAT_DIALOG_DATA);
  #apiService = inject(ApiService);
  public servicos: any;

  constructor(
    private dialogRef: MatDialogRef<DialogEditAgendamentoComponent>,
    private fb: FormBuilder
  ) {
    console.log('data: ', this.data);
    this.form = this.fb.group({
      data_agendamento: [
        this.data.agendamento.data_agendamento,
        Validators.required,
      ],
      hora_agendamento: [
        this.data.agendamento.hora_agendamento,
        Validators.required,
      ],
      id_servico: [this.data.agendamento.id_servico, Validators.required],
      descricao: [this.data.agendamento.descricao],
    });
  }
  loadServicos() {
    this.#apiService.getServicosDisponiveis().subscribe(
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

  closeDialog() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.dialogRef.close;
    }
  }

  submit() {
    if (this.form.valid) {
      // this.dialogRef.close();
      this.updateAgendamento();
    } else {
      console.log('Formulário incompleto');
      window.alert('Formulário incompleto');
    }
  }

  updateAgendamento() {
    const agendamentoData = {
      ...this.form.value,
      id: this.data.agendamento.id,
    };
    console.log(agendamentoData);
    this.#apiService.atualizaAgendamento(agendamentoData).subscribe(
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
