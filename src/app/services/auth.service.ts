import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../model/credenciais.dto';
import { FERIAS_API } from './ferias.api';
import { LocalUser } from '../model/local_user';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthService implements CanActivate {
    
    jwrHelper : JwtHelper = new JwtHelper();
    showTemplate = new EventEmitter<boolean>();
    admin = new EventEmitter<boolean>();

    constructor(public service: UserService ,public router: Router, public http: HttpClient, public storage: StorageService) {

    }

    //Restringe acesso a rotas
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
       
       if(this.storage.getLocalUser() != null){
            this.showTemplate.emit(true);
            console.log(this.storage.getLocalUser().token);
            console.log("ID: "+this.storage.getLocalUser().jti);
                this.service.buscaUserId('ferias', this.storage.getLocalUser().jti).subscribe(res => {
                    console.log(res.perfis);
                    if(res.perfis.includes('ADMIN')){
                        this.router.navigate(['/admin']);
                        //this.admin.emit(true);
                       // console.log('caiu aqui');
                    }else {
                        this.router.navigate(['/']);
                    }
                //console.log(this.storage.getLocalUser().jti);
               });
            return true;
       } else {
           this.router.navigate(['/login']);
       }
    }

    authenticate(creds : CredenciaisDTO) {
        return this.http.post(
            `${FERIAS_API}/login`, creds,
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    successfulLogin(authValue : string) {
        let token = authValue.substring(7);
        let user : LocalUser = {
            token: token,
            email:  this.jwrHelper.decodeToken(token).sub,
            jti: this.jwrHelper.decodeToken(token).jti
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }

    isLoggedIn():boolean {
        if(this.storage.getLocalUser == null){
            return false;
        }
        return true;
    }
}