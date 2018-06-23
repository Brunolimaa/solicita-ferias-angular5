import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { LoginComponent } from './component/security/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showTemplate:boolean = false;

  constructor(private auth: AuthService) {

  }

  ngOnInit(){
    this.auth.showTemplate.subscribe(res => {
      this.showTemplate = res;
    });
  }
}
