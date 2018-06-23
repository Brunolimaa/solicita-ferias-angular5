import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { FERIAS_API } from './ferias.api';
import { Ferias } from '../model/ferias.model';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Rx';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storage:StorageService) { }

  login(user: User) {
    return this.http.post(`${FERIAS_API}`, user);
  }

  solicitarFerias(url:string, ferias: Ferias) {
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});
    return this.http.post(`${FERIAS_API}/${url}`, ferias, {'headers': authHeader});
  }

  alteraStatus(status:string) {
      return this.http.put(`${FERIAS_API}`, status);
  }

  buscaTodos(url:string): Observable<Ferias[]> {

    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});

    return this.http.get<Ferias[]>(`${FERIAS_API}/${url}`, {'headers': authHeader});
  }

  buscaUserId(url:string, id:string): Observable<Usuario>{

    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});

    return this.http.get<Usuario>(`${FERIAS_API}/${url}/${id}`, {'headers': authHeader});
  }

  alterarData(url:string, id:string, ferias:Ferias){
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});

    return this.http.put(`${FERIAS_API}/${url}/${id}`, ferias, {'headers': authHeader});
  }
}
