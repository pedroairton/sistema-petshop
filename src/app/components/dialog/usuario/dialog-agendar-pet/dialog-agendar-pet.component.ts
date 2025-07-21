import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
export class DialogAgendarPetComponent {
  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    servico: new FormControl('', Validators.required),
    data_nascimento: new FormControl('', Validators.required),
    tipo_animal: new FormControl('', Validators.required),
    raca: new FormControl('', Validators.required),
  });
}
