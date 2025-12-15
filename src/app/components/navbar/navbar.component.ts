import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public name: string = localStorage.getItem('auth_admin') ?? 'Usuário';
  public now: number = new Date().getHours();
  public message: string;
  public sidebar: boolean = true;
  #authService = inject(AuthService)
  constructor(private router: Router) {
    this.message = this.greeting();
  }
  greeting() {
    if (this.now <= 12 && this.now >= 5) {
      return `Bom dia ${this.name}!`;
    } else if (this.now >= 13 && this.now <= 18) {
      return `Boa tarde ${this.name}!`;
    } else if (this.now >= 19 || this.now <= 4) {
      return `Boa noite ${this.name}!`;
    } else {
      return `Olá ${this.name}!`;
    }
  }
  toggleSidebar() {
    this.sidebar ? (this.sidebar = false) : (this.sidebar = true);
  }
  logout(){
    this.#authService.logout().subscribe(
      {
        next: () => {
          alert("Logout realizado")
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.error('Erro ao fazer loout', err);
        }
      }
    )
  }
}
