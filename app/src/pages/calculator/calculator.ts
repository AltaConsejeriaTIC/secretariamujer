import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Headers, RequestOptions, Http} from "@angular/http";

@Component({
  selector: 'page-calculator',
  templateUrl: './calculator.html'
})
export class CalculatorPage {

  equation:string;
  hasShowedResult:boolean;

  constructor(public navCtrl: NavController, public http:Http) {
    this.clear()
  }

  ionViewDidLoad() {

  }

  append(character:string){
    this.cleanPreviousEquation();
    this.equation=this.equation+character;
  }

  cleanPreviousEquation(){
    if(this.hasShowedResult){
      this.hasShowedResult=false;
      this.clear();
    }
  }

  clear(){
    this.equation='';
    this.hasShowedResult=false;
  }

  equal(){
    if(this.isPin()){

    }else{
      this.solveEquation();
    }
  }

  isPin(){
    return !((this.equation.indexOf("+") >-1 || this.equation.indexOf("-") >-1 || this.equation.indexOf("*") >-1 || this.equation.indexOf("/") >-1) || this.equation.length>4);
  }

  solveEquation(){
    try{
      this.equation=eval(this.equation);
    }catch(e){
      this.equation="Error - verifica tu operación";
    }
    this.hasShowedResult=true;
  }
}
