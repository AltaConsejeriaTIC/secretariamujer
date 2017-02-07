import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-calculator',
  templateUrl: './calculator.html'
})
export class CalculatorPage {

  operations={Add:1,subtract:2, product:3, divide:4};
  operation:number;
  number1:number;
  number2:number;

  constructor(public navCtrl: NavController) {
    this.clear()
  }

  ionViewDidLoad() {
    console.log('Hello CalculatorPage Page');
  }

  add():number{
    let result=this.number1 + this.number2;
    this.clear();
    return result;
  }
  subtract():number{
    let result=this.number1- this.number2;
    this.clear();
    return result;
  }
  product():number{
    let result=this.number1 * this.number2;
    this.clear();
    return result;
  }
  divide():number{
    let result=this.number1 / this.number2;
    this.clear();
    return result;
  }

  clear(){
    this.operation=null;
    this.number1=null;
    this.number2=null;
  }


  equal():number{
    switch(this.operation){
      case 1 :
        return this.add();

      case 2 :
        return this.subtract();

      case 3 :
        return this.product();

      case 4 :
        return this.divide();

      
    }
  }

}
