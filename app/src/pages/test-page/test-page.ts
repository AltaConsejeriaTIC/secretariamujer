import {Component} from '@angular/core';
import {NavController, Platform, Nav, NavParams} from 'ionic-angular';
import {TestsService} from "../../providers/tests-service";
import {AlertCreator} from "../../providers/alert-creator";
import {UserDAO} from "../../providers/user-dao";
import {AttentionRoutesPage} from "../attention-routes/attention-routes";
import {TipsPage} from "../tips-page/tips-page";
import {TestCategory} from "../../entity/test-categories";
import {UserService} from "../../providers/user-service";

@Component({
  selector: 'page-test-page',
  templateUrl: './test-page.html'
})
export class TestPage {

  questionsObject;
  categoryTitle;
  currentQuestion: number = 0;
  questionsNumber: number;
  isTestComplete: boolean = false;
  answerCheckBoxArray: boolean[];
  userName: string;
  resultTipFirstPhrase: string;
  resultTipSecondPhrase:string;
  resultTipThirdPhrase: string;
  resultTipFourthPhrase: string;
  resultTipFifthPhrase:string;
  buttonEnabled: boolean = false;
  buttonClass: string = "next-question unabled-button";
  selectedTestCategory: TestCategory;

  constructor(public platform: Platform, private nav: Nav, public navController: NavController, public navParams: NavParams, public testService: TestsService, public alertCreator: AlertCreator, public userDAO: UserDAO, private userService:UserService) {
    this.questionsObject = [
      {
        "pregunta": "",
        "respuesta1": "",
        "respuesta2": "",
        "respuesta3": "",
      },
    ];
    this.selectedTestCategory = this.navParams.get('selectedTestCategory');
    this.categoryTitle = this.getCategoryname();
    this.userName = this.userService.user.username || "Yabushita Mai";
    this.clearCheckboxArray();
    this.platform.registerBackButtonAction(() => {
      this.navController.popToRoot();
    });
  }

  ionViewWillEnter() {
    this.nav.swipeBackEnabled = false;
  }

  ionViewDidLoad() {
    this.loadQuestions();
  }

  getCategoryname() {
    let categoryTitle = "";
    for (let i = 0; i < this.selectedTestCategory.labels.length; i++) {
      categoryTitle += this.selectedTestCategory.labels[i] + " ";
    }
    return categoryTitle;
  }

  loadQuestions() {
    this.testService.getTestQuestions(this.selectedTestCategory.RESTAddress).map(res => res.json()).subscribe(response => {
      console.log("la respuesta", response);
      this.questionsObject = response;
      this.questionsNumber = (this.questionsObject.length - 1);
    }, err => {
      console.log("el error", err.toString())
    });
  }

  answerCurrentQuestion() {
    if (this.buttonEnabled && (this.answerCheckBoxArray[0] || this.answerCheckBoxArray[1] || this.answerCheckBoxArray[2])) {
      let answer = this.getAnswer();
      this.testService.addCurrentQuestionAnswerToTotalUserAnswers(answer);
      this.clearCheckboxArray();
      this.nextQuestion();
      this.setAnswerButtonState(false);
    }
  }

  setAnswerButtonState(enable: boolean) {
    this.buttonEnabled = enable;
    this.buttonClass = (enable) ? "next-question" : "next-question unabled-button";
  }

  getAnswer(): string {
    if (this.answerCheckBoxArray[0]) {
      return 'yes';
    } else if (this.answerCheckBoxArray[1]) {
      return 'no';
    } else if (this.answerCheckBoxArray[2]) {
      return 'maybe';
    }
  }

  clearCheckboxArray() {
    this.answerCheckBoxArray = [false, false, false];
  }

  setCheckBoxArray(checkBoxIndex: number) {
    for (let i = 0; i < this.answerCheckBoxArray.length; i++) {
      this.answerCheckBoxArray[i] = (i != checkBoxIndex) ? false : this.answerCheckBoxArray[i];
    }
    this.answerCheckBoxArray[checkBoxIndex] = !this.answerCheckBoxArray[checkBoxIndex];
    this.setAnswerButtonState(this.answerCheckBoxArray[checkBoxIndex]);
  }

  nextQuestion() {
    if (this.currentQuestion == this.questionsNumber) {
      this.setResultTipsMessages(this.testService.getResults());
      this.isTestComplete = true;
      this.testService.resetValues();
    } else {
      this.currentQuestion++;
    }
  }

  setResultTipsMessages(result: string) {
    if (result == 'yes') {
      this.resultTipFirstPhrase = 'SOFIApp cree que';
      this.resultTipSecondPhrase = 'es importante buscar apoyo';
      this.resultTipThirdPhrase = 'SOFIApp te apoya en la toma de decisiones';
      this.resultTipFourthPhrase = 'para evitar o poner fin a las violencias';
      this.resultTipFifthPhrase = 'y tiene unos consejos para tí'
    } else if (result == 'no') {
      this.resultTipFirstPhrase = 'SOFIApp reconoce tus capacidades';
      this.resultTipSecondPhrase = 'para poner límites frente a las violencias';
      this.resultTipThirdPhrase = 'SOFIApp te ayuda a prevenir las violencias';
      this.resultTipFourthPhrase = 'y tiene información';
      this.resultTipFifthPhrase = 'muy importante para tí'

    }
  }

  goBackPage(){
    this.navController.pop();
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

  goToTips() {
    this.navController.push(TipsPage, {selectedTipCategory: this.navParams.get('selectedTipCategory')});
  }

  goToRoutes() {
    this.navController.push(AttentionRoutesPage);
  }

}
