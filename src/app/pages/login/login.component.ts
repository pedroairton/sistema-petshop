import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private route = inject(ActivatedRoute)
  private returnUrl: string = '/dashboard'

  constructor(private router: Router){
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/dashboard'
    })
  }

  #apiService = inject(ApiService);
  form = new FormGroup({
    usuario: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  });
  submitLogin() {
    if (this.form.valid) {
      this.#apiService.loginAdmin(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.error('Erro ao fazer login', err);
        }
      }
        // (response) => {
        //   console.log(response);
        //   alert('Login realizado com sucesso');
        //   this.router.navigate(['/dashboard'])
        // },
        // (err) => {
        //   console.error('Erro: ', err);
        // }
      );
    }
  }
}
