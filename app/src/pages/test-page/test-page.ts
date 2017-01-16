import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
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
  isTestComplete:boolean=false;

  constructor(public navCtrl: NavController, public testService: TestsService, public alertCreator: AlertCreator) {
    this.questionsObject = [
      {
        "pregunta": "",
        "respuesta1": "",
        "respuesta2": "",
        "respuesta3": "",
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

  answerCurrentQuestion(answer:string){
    this.testService.addCurrentQuestionAnswerToTotalUserAnswers(answer);
    this.nextQuestion();
  }

  nextQuestion(){
    if(this.currentQuestion==this.questionsNumber){
      let message='sufre ud de esta clase de violencia: '+this.testService.getResults();
      this.alertCreator.showSimpleAlert('respuestas',message);
      this.isTestComplete=true;
    }else{
      this.currentQuestion++;
    }
  }
}
