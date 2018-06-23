import { Component, OnInit } from '@angular/core';
import { Ferias } from '../../model/ferias.model';
import * as moment from 'moment';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../model/usuario.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  abono: number;
  dataInicio: string;
  dataFim: string;
  perfis: Array<string>;
  ferias: Ferias = new Ferias('', '', false, this.storage.getLocalUser().jti);
  listaFerias: Usuario = new Usuario;
  id:string = null;
  mensagem:string = "";

  constructor(private service: UserService, private storage: StorageService) { 
    this.abono = 30;
    this.ferias.dataInicio
  }

  ngOnInit() {
  }

  solicitarFerias(){
    let data = this.ferias.dataInicio.split('/');
    let data1 = this.ferias.dataFim.split('/');
    
    let dia = data['0'];
    let mes = data['1'];
    let ano = data['2'];
  
    let dia1 = data1['0'];
    let mes1 = data1['1'];
    let ano1 = data1['2'];

    console.log(this.ferias);
    this.ferias.status = false;

    this.ferias.dataInicio = ano+"-"+mes+"-"+dia;
    this.ferias.dataFim = ano1+"-"+mes1+"-"+dia1;

    if(this.id == null){
      this.service.solicitarFerias('feriasrest',this.ferias).subscribe(() => {
        this.ferias.dataInicio = "";
        this.ferias.dataFim = "";
    
        this.mensagem = "Dadastrado com sucesso";

      }, erro => { console.log("Erro ao cadastrar data")});
    } else {
      this.service.alterarData('feriasrest', this.id, this.ferias).subscribe(()=> {
        this.ferias.dataInicio = "";
        this.ferias.dataFim = "";
    
          this.mensagem = "Alterado com sucesso";
      });
    }
  }

  addFerias(){
    let data = this.ferias.dataInicio.split('/');
    let data1 = this.ferias.dataFim.split('/');
    
    let dia = data['0'];
    let mes = data['1'];
    let ano = data['2'];

    let dia1 = data1['0'];
    let mes1 = data1['1'];
    let ano1 = data1['2'];

    let dataIni = moment(ano+"-"+mes+"-"+dia);
    let dataFim = moment(ano1+"-"+mes1+"-"+dia1);

    let diff  = dataFim.diff(dataIni, 'days');
    this.abono = this.abono - diff;
  }

  getUser(){
     this.service.buscaUserId('ferias', this.storage.getLocalUser().jti).subscribe(res => {
       this.listaFerias = res;
       console.log(this.listaFerias);
       //console.log(this.storage.getLocalUser().jti);
      });
  }

  alterarData(dataIni, dataFim, id){
    this.id = id;
  
    let data = dataIni.split('-');
    let data1 = dataFim.split('-');
    
    let dia = data['2'];
    let mes = data['1'];
    let ano = data['0'];
  
    let dia1 = data1['2'];
    let mes1 = data1['1'];
    let ano1 = data1['0'];

    this.ferias.dataInicio = dia+"/"+mes+"/"+ano;
    this.ferias.dataFim = dia1+"/"+mes1+"/"+ano1;

    console.log(this.dataInicio);
  }

}
