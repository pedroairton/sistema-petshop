import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "http://localhost:8000"
  
  constructor(private http: HttpClient) { }
  
  // get
  getUsuarios(): Observable<any>{
    return this.http.get(this.apiUrl+'/usuarios')
  }
}
