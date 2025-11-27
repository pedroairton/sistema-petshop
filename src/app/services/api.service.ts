import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

export interface Admin {
  id: number,
  usuario: string
}
export interface AuthResponse {
  authenticated: boolean,
  admin?: Admin
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:8000';
  // private apiUrl = 'https://api1.srv1109011.hstgr.cloud';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  private currentAdminSubject = new BehaviorSubject<Admin | null>(null)

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable()
  public currentAdmin$ = this.currentAdminSubject.asObservable()

  constructor(){
    this.checkAuth().subscribe()
  }
  // auth

  // loginAdmin(admData: any) {
  //   return this.http.post(this.apiUrl + '/api/login', admData);
  // }
  loginAdmin(admData: any) {
    return this.http.post(this.apiUrl + '/api/login', admData).pipe(
      tap((response: any) => {
        this.isAuthenticatedSubject.next(true)
        this.currentAdminSubject.next(response.admin)
      })
    );
  }
  logout() {
    return this.http.post(this.apiUrl+ '/api/auth/logout', {}).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false)
        this.currentAdminSubject.next(null)
      })
    )
  }
  checkAuth(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/auth/check`).pipe(
      tap(response => {
        this.isAuthenticatedSubject.next(response.authenticated);
        if (response.authenticated && response.admin) {
          this.currentAdminSubject.next(response.admin);
          console.log('Usuário está autenticado');
          
        } else {
          this.currentAdminSubject.next(null);
        }
      })
    );
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value
  }

  get currentAdmin(): Admin | null {
    return this.currentAdminSubject.value
  }

  // get
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/usuarios');
  }
  getUsuario(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/api/usuarios/' + id);
  }
  getUsuariosCount(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/count/usuarios');
  }
  searchUsuario(nome: string): Observable<any> {
    return this.http.get(this.apiUrl + '/api/busca-user/?nome=' + nome);
  }
  getAgenda(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/agendamento');
  }
  getAgendaDashboard(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/agendamento/mini');
  }
  // getAgendaNext(): Observable<any> {
  //   return this.http.get(this.apiUrl + '/agendamento/next');
  // }
  // getAgendaPrev(): Observable<any> {
  //   return this.http.get(this.apiUrl + '/agendamento/prev');
  // }
  getPet(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/api/pet/' + id);
  }
  getPetAgenda(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/api/agendamento/' + id);
  }
  getServicosDisponiveis(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/servicos');
  }
  getServicosCount(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/count/servicos');
  }
  // getServico(idServico: number){
  //   return this.http.get(this.apiUrl+'/api/servico/'+idServico)
  // }
  getPetCount(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/count/pet');
  }
  // post
  createUsuario(userData: any): Observable<any> {
    return this.http
      .post(this.apiUrl + '/api/usuarios', userData)
      .pipe(catchError(this.handleError));
  }
  createPet(petData: any) {
    return this.http.post(
      this.apiUrl + '/api/usuarios/' + petData.id_dono,
      petData
    );
  }
  createAgendamento(dataAgendamento: any) {
    return this.http.post(this.apiUrl + '/api/agendamento', dataAgendamento);
  }
  createServico(dataServico: any) {
    return this.http.post(this.apiUrl + '/api/servico', dataServico);
  }
  // put
  concluiAgendamento(idAgendamento: number) {
    return this.http.put(
      this.apiUrl + '/api/agendamento/' + idAgendamento + '/concluir',
      {}
    );
  }
  atualizaPet(petData: any) {
    return this.http.put(
      this.apiUrl + '/api/pet/atualizar/' + petData.id,
      petData
    );
  }
  atualizaUsuario(userData: any) {
    return this.http.put(
      this.apiUrl + '/api/usuarios/atualizar/' + userData.id,
      userData
    );
  }
  mudaStatusServico(idServico: number) {
    return this.http.put(
      this.apiUrl + '/api/servico/' + idServico + '/status',
      {}
    );
  }
  atualizaServico(servicoData: any) {
    return this.http.put(
      this.apiUrl + '/api/servico/atualizar/' + servicoData.id,
      servicoData
    );
  }
  atualizaAgendamento(agendamentoData: any) {
    return this.http.put(
      this.apiUrl + '/api/agendamento/atualizar/' + agendamentoData.id,
      agendamentoData
    );
  }
  // delete
  deletaServico(idServico: number) {
    return this.http.delete(
      this.apiUrl + '/api/servico/' + idServico + '/delete'
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      console.error(
        `Backend retornou código: ${error.status},` + `body: ${error.error}`
      );
    }
    return throwError('Algum erro ocorreu, tente novamente.');
  }
}
