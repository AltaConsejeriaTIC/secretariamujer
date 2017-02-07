import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Headers, RequestOptions, Http} from "@angular/http";

@Component({
  selector: 'page-calculator',
  templateUrl: './calculator.html'
})
export class CalculatorPage {

  equation:string;

  constructor(public navCtrl: NavController, public http:Http) {
    this.clear()
  }

  ionViewDidLoad() {

  }

  append(character:string){
    this.equation=this.equation+character;
  }

  clear(){
    this.equation='';
  }

  equal(){
    try{
      this.equation=eval(this.equation);

    }catch(e){
      this.equation="Error - verifica tu operación";
    }
  }

}
