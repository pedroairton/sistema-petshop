import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-servicos',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss',
})
export class ServicosComponent implements OnInit {
  #apiService = inject(ApiService);
  form = new FormGroup({
    nome_servico: new FormControl('', Validators.required),
    status: new FormControl(''),
  });

  public servicosTotal: any;
  public indexServicos: boolean = true;
  toggleServicos(value: boolean) {
    this.indexServicos = value;
  }
  loadServicosCount() {
    this.#apiService.getServicosCount().subscribe(
      (response) => {
        console.log(response);
        this.servicosTotal = response;
      },
      (err) => {
        console.error('Erro: ', err);
      }
    );
  }
  submitServico() {
    if (this.form.valid) {
      console.log(this.form.value);
      // this.#apiService.createUsuario(this.form.value).subscribe(
      //   (response) => {
      //     console.log('Formulário enviado com sucesso', response);
      //     window.alert('Usuário Cadastrado');
      //     this.loadServicosCount();
      //   },
      //   (error) => {
      //     console.error('Erro:', error);
      //   }
      // );
    } else {
      console.log('Form inválido');
    }
  }
  ngOnInit(): void {
    this.loadServicosCount();
  }
}
