import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-dialog-agendamento',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-agendamento.component.html',
  styleUrl: './dialog-agendamento.component.scss',
})
export class DialogAgendamentoComponent implements OnInit {
  form: FormGroup;
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DialogAgendamentoComponent>);
  public pet: any;
  #apiService = inject(ApiService);
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
  loadPet() {
    this.#apiService.getPet(this.data.id).subscribe(
      (response) => {
        // console.log(response);
        this.pet = response;
      },
      (err) => {
        console.error('Erro: ', err);
      }
    );
  }
  ngOnInit(): void {
    this.loadPet();
  }
  calcularIdade(dataNascimento: string): string {
    const hoje = new Date();
    const [ano, mes, dia] = dataNascimento.split('-').map(Number);
    const nascimento = new Date(ano, mes - 1, dia); // Meses começam do 0

    // Verificação se a data de nascimento é válida
    if (isNaN(nascimento.getTime())) {
      return 'Data inválida';
    }

    let idadeAnos = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    // Ajuste da idade se ainda não fez aniversário este ano
    if (
      mesAtual < nascimento.getMonth() ||
      (mesAtual === nascimento.getMonth() && diaAtual < nascimento.getDate())
    ) {
      idadeAnos--;
    }

    // Se idade for menor que 1 ano
    if (idadeAnos < 1) {
      let idadeMeses =
        (hoje.getFullYear() - nascimento.getFullYear()) * 12 +
        hoje.getMonth() -
        nascimento.getMonth();

      // Ajustar o mês se o dia ainda não foi alcançado
      if (diaAtual < nascimento.getDate()) {
        idadeMeses--;
      }

      if (idadeMeses < 1) {
        return '<1 mês';
      }

      return `${idadeMeses} ${idadeMeses === 1 ? 'mês' : 'meses'}`;
    }

    return `${idadeAnos} ${idadeAnos === 1 ? 'ano' : 'anos'}`;
  }
}
