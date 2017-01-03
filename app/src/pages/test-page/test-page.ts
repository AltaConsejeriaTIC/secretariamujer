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

  questions:any=[
    {
      "title": "",
      "field_testdescription": "testDescripcionPregunta2",
      "field_answer1": "a",
      "field_answer2": "b",
      "field_answer3": "c",
      "field_answer4": "d",
      "field_answer5": "e",
      "field_answer6": "f"
    },
  ];
  currentQuestion:any;
  contador=0;

  ionViewDidLoad() {
    this.loadQuestions();
  }

  loadQuestions(){
    this.testService.getTestQuestions().map(res => res.json()).subscribe(response => {
      console.log("la respuesta",response);
      this.questions=response;
    }, err => {
      console.log("el error",err)

    });
  }

  siguiente(){
    this.contador=this.contador+1;
  }

}
