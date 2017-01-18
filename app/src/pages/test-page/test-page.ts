import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {TestsService} from "../../providers/tests-service";
import {AlertCreator} from "../../providers/alert-creator";
import {MenuPage} from "../menu/menu";

@Component({
  selector: 'page-test-page',
  templateUrl: './test-page.html'
})
export class TestPage {

  questionsObject;
  categoryTitle;
  currentQuestion: number = 0;
  questionsNumber: number;
  isTestComplete:boolean=false;
  answerCheckBoxArray:boolean[];

  constructor(public navController: NavController, public testService: TestsService, public alertCreator: AlertCreator) {
    this.questionsObject = [
      {
        "pregunta": "",
        "respuesta1": "",
        "respuesta2": "",
        "respuesta3": "",
      },
    ];

    this.clearCheckboxArray();
  }

  ionViewDidLoad() {
    this.categoryTitle = this.testService.getNameCategoryById();
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

  answerCurrentQuestion(){
    let answer=this.getAnswer();
    this.testService.addCurrentQuestionAnswerToTotalUserAnswers(answer);
    this.clearCheckboxArray();
    this.nextQuestion();
  }

  getAnswer():string{
    if(this.answerCheckBoxArray[0]){
      return 'yes';
    }else if( this.answerCheckBoxArray[1]) {
      return 'no';
    }else if(this.answerCheckBoxArray[2]) {
      return 'maybe';
    }
  }

  clearCheckboxArray(){
    this.answerCheckBoxArray=[false,false,false];
  }

  setCheckBoxArray(checkBoxIndex:number){
    this.clearCheckboxArray();
    this.answerCheckBoxArray[checkBoxIndex]=true;
  }

  nextQuestion(){
    if(this.currentQuestion==this.questionsNumber){
      let message='sufre ud de esta clase de violencia: '+this.testService.getResults();
      this.alertCreator.showSimpleAlert('respuestas',message);
      this.isTestComplete=true;
      this.testService.resetValues();
    }else{
      this.currentQuestion++;
    }
  }

  goToMenuPage() {
    this.navController.push(MenuPage);
  }

  goToTips() {

  }

  goToRoutes() {

  }

}
