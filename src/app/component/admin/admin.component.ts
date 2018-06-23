import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Ferias } from '../../model/ferias.model';
import { Usuario } from '../../model/usuario.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ferias: Ferias = new Ferias('', '', false, this.storage.getLocalUser().jti);
  listaFerias: Usuario = new Usuario;
  status:boolean;
  idFerias:any;
  mensagem:string = "";
  constructor(private service: UserService, private storage: StorageService) { }




  ngOnInit() {
   this.buscarTodos();
  }
  alterar(){
    console.log(this.status);
    this.ferias.status = this.status;
    this.ferias.cod = '2';
    this.service.alterarData('feriasrest', this.idFerias, this.ferias).
    subscribe(()=>{
      this.mensagem = "Alterado com sucesso!";
      this.buscarTodos();

    })
    //this.service.alterarData('feriasrest', this.id, this.ferias).subscribe(()=> {

  }

  alterarStatus(id){
    this.idFerias = id;
  }

  buscarTodos(){
    this.service.buscaUserId('ferias', '2').subscribe(res => {
      this.listaFerias = res;
      console.log(this.listaFerias);
      //console.log(this.storage.getLocalUser().jti);
     });
  }



}
