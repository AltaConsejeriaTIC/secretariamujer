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

  constructor(public navCtrl: NavController, public testService: TestsService, public alertCreator: AlertCreator) {
    this.questionsObject = [
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
    if (this.buttonText == 'Siguiente') {
      this.currentQuestion = this.currentQuestion + 1;
    }
    this.changeButtonNameIfIsLastQuestion();
  }

  changeButtonNameIfIsLastQuestion() {
    if (this.currentQuestion == this.questionsNumber) {
      this.buttonText = 'Finalizar';
    }
  }

}
