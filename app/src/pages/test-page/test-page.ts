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

  answerCheckBoxArray:Array<boolean>=[false,false,false,false,false,false];

  userAnswersObject;



  constructor(public navCtrl: NavController, public testService: TestsService, public alertCreator: AlertCreator) {
    this.questionsObject = [
      {
        "title": "",
        "field_testdescription": "",
        "field_answer1": "",
        "field_answer2": "",
        "field_answer3": "",
        "field_answer4": "",
        "field_answer5": "",
        "field_answer6": ""
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
    this.addUserAnswers();

    if (this.buttonText == 'Siguiente') {
      this.currentQuestion = this.currentQuestion + 1;
    }
    this.changeButtonNameIfIsLastQuestion();
  }

  addUserAnswers(){
    let currentQuestionUserAnswers=[];
    for(let i=0; i<this.answerCheckBoxArray.length;i++){
      if(this.answerCheckBoxArray[i]==true){
        currentQuestionUserAnswers.push(i);
      }
    }
    console.log("las respuestas", currentQuestionUserAnswers);
  }

  changeButtonNameIfIsLastQuestion() {
    if (this.currentQuestion == this.questionsNumber) {
      this.buttonText = 'Finalizar';
    }
  }

}
