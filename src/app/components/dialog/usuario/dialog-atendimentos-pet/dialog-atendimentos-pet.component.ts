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
  selector: 'app-dialog-atendimentos-pet',
  imports: [MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,],
  templateUrl: './dialog-atendimentos-pet.component.html',
  styleUrl: './dialog-atendimentos-pet.component.scss'
})
export class DialogAtendimentosPetComponent {
form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogAtendimentosPetComponent>,
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
