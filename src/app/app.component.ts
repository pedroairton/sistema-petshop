import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiService } from './services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { DialogFormUsuarioComponent } from './components/dialog/usuario/dialog-form-usuario/dialog-form-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  panelOpenState = false;
  title: string = 'petshop';
  public mobile: boolean = false;

  constructor(private dialog: MatDialog) {}
  openDialog(){
    this.dialog.open(DialogFormUsuarioComponent), {
      width: '300px'
    }
  }
  toggleMobile() {
    this.mobile === true ? (this.mobile = false) : (this.mobile = true);
  }
}
