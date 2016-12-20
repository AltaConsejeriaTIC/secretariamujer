import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AdminAPI provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AdminAPI {

  constructor(public http: Http) {
  }

   outputPrint(){
    console.log("esta imprimiendo", 9+9);
  }

  loginAsAppUser(){
     let name = "app";
     let pass="app";
     let body=JSON.stringify({ name, pass })
     this.http.post('http://192.168.88.246/admin/user/login?_format=json',body)
       .subscribe(res=>{
         console.log("lo que respondio", res)
       },
       err=>{
         console.log("hubo un error", err)
       })

  }

  getusers(){
     this.http.get('http://192.168.88.246/admin/user/1?_format=json').map(res=>res.json())
       .subscribe(data=>{
          console.log("lo que recibio en get users", data)
     },
      err=>{
        console.log("hubo un error en get users", err)
      })
  }

}
