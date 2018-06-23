import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, private storage: StorageService) { }

  ngOnInit() {
  }

  logout() {
    this.storage.setLocalUser(null);
    this.router.navigate(['/login']);
    //this.logout();
    console.log("Aqui");
  }
}
