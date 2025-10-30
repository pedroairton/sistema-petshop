import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditServicoComponent } from '../../components/dialog/servicos/dialog-edit-servico/dialog-edit-servico.component';

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
  constructor(private dialog: MatDialog){}
  openDialogEdit(servico: any) {
      this.dialog.open(DialogEditServicoComponent, {
        data: { servico },
      }),
        {
          minWidth: '1100px',
          maxWidth: '100%',
          width: '1600px',
        };
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
      this.#apiService.createServico(this.form.value).subscribe(
        (response) => {
          console.log('Formulário enviado com sucesso', response);
          window.alert('Serviço criado com sucesso');
          this.loadServicosCount();
        },
        (error) => {
          console.error('Erro:', error);
        }
      );
    } else {
      console.log('Form inválido');
    }
  }
  changeStatusServico(idServico: number){   
    confirm("Deseja alterar o status desse serviço ?") 
    this.#apiService.mudaStatusServico(idServico).subscribe(
      response => {
        console.log(response);
        alert(response)
        this.loadServicosCount()
      } , err => {
        console.error('Erro: ', err);
        
      }
    )
  }
  deleteServico(idServico: number){
    confirm("Deseja deletar esse serviço ? Essa decisão é irreversível")
    this.#apiService.deletaServico(idServico).subscribe(
      response => {
        console.log(response);
        alert("Serviço deletado com sucesso")
        this.loadServicosCount()
      }, err => {
        console.error('Erro: ', err);
      }
    )
  }
  ngOnInit(): void {
    this.loadServicosCount();
  }
}
