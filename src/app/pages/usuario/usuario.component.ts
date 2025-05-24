import { Component, inject, OnInit } from '@angular/core';
import { DialogAtendimentosPetComponent } from '../../components/dialog/usuario/dialog-atendimentos-pet/dialog-atendimentos-pet.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-usuario',
  imports: [RouterModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
})
export class UsuarioComponent implements OnInit {
  id?: number;
  dados: any
  #apiService = inject(ApiService);

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}
  openDialog() {
    this.dialog.open(DialogAtendimentosPetComponent),
      {
        minWidth: '1100px',
        maxWidth: '100%',
        width: '1600px',
      };
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((par: any) => {
      this.id = par.get('id') || NaN;
      if (this.id) {
        this.#apiService.getUsuario(this.id).subscribe(
          (response) => {
            this.dados = response
            console.log(this.dados);
          },
          (error) => {
            console.error('Erro:', error);
          }
        );
      }
    });
  }
  calcularIdade(dataNascimento: string): string {
    const hoje = new Date();
    const [ano, mes, dia] = dataNascimento.split('-').map(Number);
    const nascimento = new Date(ano, mes - 1, dia); // Meses começam do 0

    // Verificação se a data de nascimento é válida
    if (isNaN(nascimento.getTime())) {
        return "Data inválida";
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
        let idadeMeses = (hoje.getFullYear() - nascimento.getFullYear()) * 12 +
                         hoje.getMonth() - nascimento.getMonth();

        // Ajustar o mês se o dia ainda não foi alcançado
        if (diaAtual < nascimento.getDate()) {
            idadeMeses--;
        }

        if (idadeMeses < 1) {
            return "<1 mês";
        }

        return `${idadeMeses} ${idadeMeses === 1 ? 'mês' : 'meses'}`;
    }

    return `${idadeAnos} ${idadeAnos === 1 ? 'ano' : 'anos'}`;
}
}
