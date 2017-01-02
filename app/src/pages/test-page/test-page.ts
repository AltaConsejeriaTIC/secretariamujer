import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TestsService} from "../../providers/tests-service";
import {AlertCreator} from "../../providers/alert-creator";

@Component({
  selector: 'page-test-page',
  templateUrl: './test-page.html'
})
export class TestPage {

  constructor(public navCtrl: NavController, public testService: TestsService, public alertCreator:AlertCreator) {}

  ionViewDidLoad() {
    this.loadQuestions();
  }

  loadQuestions(){
    this.testService.getTestQuestions().map(res => res.json()).subscribe(response => {
      console.log("la respuesta fue", response);
    }, err => {
    });
  }

}
