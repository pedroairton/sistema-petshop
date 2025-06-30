import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // get
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/usuarios');
  }
  getUsuario(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/api/usuarios/' + id);
  }
  searchUsuario(nome: string): Observable<any> {
    return this.http.get(this.apiUrl + '/api/busca-user/?nome=' + nome);
  }
  getAgenda(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/agendamento');
  }
  // getAgendaNext(): Observable<any> {
  //   return this.http.get(this.apiUrl + '/agendamento/next');
  // }
  // getAgendaPrev(): Observable<any> {
  //   return this.http.get(this.apiUrl + '/agendamento/prev');
  // }
  getPet(id: number): Observable<any> {
    return this.http.get(this.apiUrl+'/api/pet/'+id)
  }
  getPetAgenda(id: number): Observable<any> {
    return this.http.get(this.apiUrl+'/api/agendamento/'+id)
  }
  // post
  createUsuario(userData: any): Observable<any> {
    return this.http
      .post(this.apiUrl + '/api/usuarios', userData)
      .pipe(
        catchError(this.handleError)
      );
  }
  createPet(petData: any) {
    return this.http.post(this.apiUrl+'/api/usuarios/'+petData.id_dono, petData)
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      console.error(
        `Backend retornou código: ${error.status},` + `body: ${error.error}`
      );
    }
    return throwError(
      'Algum erro ocorreu, tente novamente.'
    )
  }
}
