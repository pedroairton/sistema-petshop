import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
export class DialogAgendamentoComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogAgendamentoComponent>,
    private fb: FormBuilder
  ) {
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
}
