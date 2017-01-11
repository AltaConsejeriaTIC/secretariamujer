import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TestsService} from "../../providers/tests-service";
import {AlertCreator} from "../../providers/alert-creator";

@Component({
  selector: 'page-test-page',
  templateUrl: './test-page.html'
})
export class TestPage {

  questionsObject;
  currentQuestion: number = 0;
  questionsNumber: number;
  buttonText: string = "Siguiente";

  answerCheckBoxArray:Array<boolean>=[false,false,false];


  constructor(public navCtrl: NavController, public testService: TestsService, public alertCreator: AlertCreator) {
    this.questionsObject = [
      {
        "field_pregunta_violencia_economi": "",
        "field_respuesta_1_violencia_econ": "",
        "field_respuesta_2_violencia_econ": "",
        "field_respuesta_3_violencia_econ": "",
      },
    ];
  }

  ionViewDidLoad() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.testService.getTestQuestions().map(res => res.json()).subscribe(response => {
      console.log("la respuesta", response);
      this.questionsObject = response;
      this.questionsNumber = (this.questionsObject.length - 1);
    }, err => {
      console.log("el error", err)

    });
  }

  nextQuestion() {
    this.addCurrentQuestionUserAnswers();

    if (this.buttonText == 'Siguiente') {
      this.currentQuestion = this.currentQuestion + 1;
    }
    this.changeButtonNameIfIsLastQuestion();
  }

  addCurrentQuestionUserAnswers(){
    this.testService.addCurrentQuestionUserAnswers(this.answerCheckBoxArray);
    this.resetAnswerCheckBoxArray();
  }

  resetAnswerCheckBoxArray(){
    this.answerCheckBoxArray=[false,false,false];
  }

  changeButtonNameIfIsLastQuestion() {
    if (this.currentQuestion == this.questionsNumber) {
      this.buttonText = 'Finalizar';
    }
  }

}
