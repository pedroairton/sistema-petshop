import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AgendaComponent } from './pages/agenda/agenda.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Petshop - Login' },
  { path: 'dashboard', component: DashboardComponent, title: 'Petshop - Dashboard' },
  { path: 'usuarios', component: UsuariosComponent, title: 'Petshop - Usuários' },
  { path: 'usuarios/:id', component: UsuarioComponent, title: 'Petshop - Usuário' },
  { path: 'agenda', component: AgendaComponent, title: 'Petshop - Agenda' },

];
