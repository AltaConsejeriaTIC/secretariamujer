import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {TestsService} from "../../providers/tests-service";
import {AlertCreator} from "../../providers/alert-creator";
import {MenuPage} from "../menu/menu";
import {UserDAO} from "../../providers/user-dao";

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
  userName:string;
  resultTipFirstPhrase:string;
  resultTipThirdPhrase:string;
  resultTipFourthPhrase:string;

  constructor(public navController: NavController, public testService: TestsService, public alertCreator: AlertCreator, public userDAO:UserDAO) {
    this.questionsObject = [
      {
        "pregunta": "",
        "respuesta1": "",
        "respuesta2": "",
        "respuesta3": "",
      },
    ];
    this.userName=this.userDAO.getUsername() || "Yabushita Mai";
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
      this.setResultTipsMessages(this.testService.getResults());
      this.isTestComplete=true;
      this.testService.resetValues();
    }else{
      this.currentQuestion++;
    }
  }

  setResultTipsMessages(result:string){
    if(result=='yes'){
      this.resultTipFirstPhrase='Al parecer Sofía cree que';
      this.resultTipThirdPhrase='y tiene';
      this.resultTipFourthPhrase='unos consejos para tí'
    }else if(result=='no'){
      this.resultTipFirstPhrase='Al parecer Sofía no cree que';
      this.resultTipThirdPhrase='pero';
      this.resultTipFourthPhrase='tiene unos consejos para tí'
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
