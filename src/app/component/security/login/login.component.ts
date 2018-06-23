import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from '../../../model/user.model';
import { Router } from '@angular/router';
import { CredenciaisDTO } from '../../../model/credenciais.dto';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = new User('','','','','');
  
  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };
  
  lista: Array<User>;

  constructor(
    private router: Router,
    public auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    //this.teste.email = this.email;
    //this.lista.push(this.user.email);
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.router.navigate(['/']);
    }, erro => {console.log("Erro autenticacao")})
  }

}
