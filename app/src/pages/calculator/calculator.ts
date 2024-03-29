import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserNameFormPage} from "../user-name-form/user-name-form";

@Component({
  selector: 'page-calculator',
  templateUrl: './calculator.html'
})
export class CalculatorPage {

  equation:string;
  hasShowedResult:boolean;
  result:string;

  constructor(public navCtrl: NavController) {
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
    this.result='';
    this.hasShowedResult=false;
  }

  equal(){
    if(this.isPin()){
      this.goToConfirmUserForm();
    }else{
      this.solveEquation();
    }
  }

  erase(){
    this.equation=this.equation.slice(0,-1);
  }

  isPin(){
    return !((this.equation.indexOf("+") >-1 || this.equation.indexOf("-") >-1 || this.equation.indexOf("*") >-1 || this.equation.indexOf("/") >-1) || this.equation.length!=4);
  }

  solveEquation(){
    try{
      this.result=eval(this.equation)+'';
    }catch(e){
      this.equation="Error - verifica tu operación";
    }
    this.hasShowedResult=true;
  }

  goToConfirmUserForm(){
    this.navCtrl.push(UserNameFormPage,{pinNumber:this.equation});
    this.clear();

  }
}
