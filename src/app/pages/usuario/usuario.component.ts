import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DialogAtendimentosPetComponent } from '../../components/dialog/usuario/dialog-atendimentos-pet/dialog-atendimentos-pet.component';
import { DialogAgendarPetComponent } from '../../components/dialog/usuario/dialog-agendar-pet/dialog-agendar-pet.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogEditPetComponent } from '../../components/dialog/usuario/dialog-edit-pet/dialog-edit-pet.component';

@Component({
  selector: 'app-usuario',
  imports: [
    CommonModule,
    RouterModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
})
export class UsuarioComponent implements OnInit {
  id?: number;
  dados: any;
  #apiService = inject(ApiService);
  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    data_nascimento: new FormControl('', Validators.required),
    tipo_animal: new FormControl('', Validators.required),
    raca: new FormControl('', Validators.required),
  });

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}
  openDialog(idPet: number) {
    (this.dialog.open(DialogAtendimentosPetComponent, {
      data: { id: idPet },
    }),
      {
        minWidth: '1100px',
        maxWidth: '100%',
        width: '1600px',
      });
  }
  openDialogAgenda(idPet: number) {
    (this.dialog.open(DialogAgendarPetComponent, {
      data: { id: idPet },
    }),
      {
        minWidth: '1100px',
        maxWidth: '100%',
        width: '1600px',
      });
  }
  openDialogEdit(pet: any) {
    (this.dialog.open(DialogEditPetComponent, {
      data: { pet },
    }),
      {
        minWidth: '1100px',
        maxWidth: '100%',
        width: '1600px',
      });
  }
  public indexUsuarios: boolean = true;
  toggleUsuarios(value: boolean) {
    this.indexUsuarios = value;
  }
  submitPet() {
    if (this.form.valid) {
      console.log(this.form);
      const petData = {
        ...this.form.value,
        id_dono: this.id,
      };
      // return console.log(petData)
      this.#apiService.createPet(petData).subscribe(
        (response) => {
          console.log('Formulário enviado com sucesso', response);
          window.alert('Pet cadastrado com sucesso');
          if (this.id) {
            this.#apiService.getUsuario(this.id).subscribe(
              (response) => {
                this.dados = response;
                console.log(this.dados);
              },
              (error) => {
                console.error('Erro:', error);
              },
            );
          }
        },
        (error) => {
          console.error('Erro:', error);
        },
      );
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((par: any) => {
      this.id = par.get('id') || NaN;
      if (this.id) {
        this.loadUsuario(this.id);
      }
    });
  }
  loadUsuario(id: any) {
    this.#apiService.getUsuario(id).subscribe(
      (response) => {
        this.dados = response;
        console.log(this.dados);
      },
      (error) => {
        console.error('Erro:', error);
      },
    );
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
  deletePet(idPet: number) {
    if (confirm('Deseja realmente excluir este pet?')) {
      this.#apiService.deletaPet(idPet).subscribe(
        (response) => {
          console.log('Pet excluído com sucesso', response);
          window.alert('Pet excluído com sucesso');
          this.loadUsuario(this.id);
        },
        (err) => {
          console.error('Erro:', err);
        },
      );
    }
  }
}
