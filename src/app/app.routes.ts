import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Petshop - Login', data: {hideNavbar: false} },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Petshop - Dashboard',
    canActivate: [authGuard],
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    title: 'Petshop - Usuários',
    canActivate: [authGuard],
  },
  {
    path: 'usuarios/:id',
    component: UsuarioComponent,
    title: 'Petshop - Usuário',
    canActivate: [authGuard],
  },
  {
    path: 'agenda',
    component: AgendaComponent,
    title: 'Petshop - Agenda',
    canActivate: [authGuard],
  },
  {
    path: 'servicos',
    component: ServicosComponent,
    title: 'Petshop - Serviços',
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
