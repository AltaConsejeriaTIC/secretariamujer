import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule, Nav,
  NavParams, LoadingController, Loading
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock, NavMock, LoadingMock, LoadingControllerMock, AlertCreatorMock} from '../../mocks';
import {AlertCreator} from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {TestPage} from "./test-page";
import {TestsService} from "../../providers/tests-service";
import {UserDAO} from "../../providers/user-dao";
import {ApplicationConfig} from "../../config";
import {UserService} from "../../providers/user-service";
import {UserAdapter} from "../../providers/adapter/user-adapter";
import {UserFactory} from "../../providers/user-factory";
import {OfflineService} from "../../providers/offline-service";


describe('TestPage tests', () => {

  let testPage: TestPage;
  let fixture: ComponentFixture<TestPage>;
  let alertCreator: AlertCreator;
  let testService: TestsService;
  let stubNavParams = {
    get: () => {
      return {
        id: 0,
        labels: ['Violencia', "Económica"]
      }
    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, TestPage,UserService,
        ApplicationConfig, UserAdapter, UserFactory,OfflineService,
        TestsService, UserDAO,
        {
          provide: Config, useClass: ConfigMock
        },
        {
          provide: Nav, useClass: NavMock
        }, {provide: NavParams, useValue: stubNavParams},{provide: Loading, useClass: LoadingMock},
        {provide: LoadingController, useClass: LoadingControllerMock},
        {
          provide: AlertCreator,
          useClass: AlertCreatorMock
        },
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPage);
    testPage = fixture.componentInstance;
  });

  beforeEach(inject([AlertCreator, TestsService], (_alertCreator, _testService) => {
    alertCreator = _alertCreator;
    testService = _testService;
  }));

  it('loadQuestions should call getTestQuestions from TestsService', () => {
    spyOn(testService, 'getTestQuestions').and.callThrough();
    testPage.loadQuestions();
    expect(testService.getTestQuestions).toHaveBeenCalled();
  });

  it('answerCurrentQuestion should call addCurrentQuestionAnswerToTotalUserAnswers from TestsService', () => {
    spyOn(testService, 'addCurrentQuestionAnswerToTotalUserAnswers').and.callThrough();
    testPage.buttonEnabled = true;
    testPage.answerCheckBoxArray[0] = true;
    testPage.answerCurrentQuestion();
    expect(testService.addCurrentQuestionAnswerToTotalUserAnswers).toHaveBeenCalled();
  });

  it('nextQuestion should add by 1 current question variable if current question is different than questionnumber', () => {
    testPage.nextQuestion();
    expect(testPage.currentQuestion).toEqual(1);
  });

  it('nextQuestion should call getResults from TestService if current question is equal than questionnumber', () => {
    spyOn(testService, 'getResults').and.callThrough();
    testPage.currentQuestion = 1;
    testPage.questionsNumber = 1;
    testPage.nextQuestion();
    expect(testService.getResults).toHaveBeenCalled();
  });

  it('nextQuestion should set isTestComplete to true if test was completed', () => {
    spyOn(testService, 'getResults').and.callThrough();
    testPage.currentQuestion = 1;
    testPage.questionsNumber = 1;
    testPage.nextQuestion();
    expect(testPage.isTestComplete).toBe(true);
  });
  it('getAnswer should return yes if 1st checkbox is true, no if 2nd checkbox is true and maybe if 3rd checkbox is true', () => {
    testPage.answerCheckBoxArray = [true, false, false];
    testPage.getAnswer();
    expect(testPage.getAnswer()).toEqual('yes');
    testPage.answerCheckBoxArray = [false, true, false];
    testPage.getAnswer();
    expect(testPage.getAnswer()).toEqual('no');
    testPage.answerCheckBoxArray = [false, false, true];
    testPage.getAnswer();
    expect(testPage.getAnswer()).toEqual('maybe');
  });

  it('setCheckBoxArray should set only 1 checkbox as true', () => {
    testPage.setCheckBoxArray(2);
    expect(testPage.answerCheckBoxArray[0]).toEqual(false);
    expect(testPage.answerCheckBoxArray[1]).toEqual(false);
    expect(testPage.answerCheckBoxArray[2]).toEqual(true);
  });

  it('clearCheckboxArray should set all clearCheckboxArray values to false', () => {
    testPage.clearCheckboxArray();
    expect(testPage.answerCheckBoxArray.length).toEqual(3);
    expect(testPage.answerCheckBoxArray[0]).toEqual(false);
    expect(testPage.answerCheckBoxArray[1]).toEqual(false);
    expect(testPage.answerCheckBoxArray[2]).toEqual(false);
  });

  it('nextQuestion should call resetValues from TestService  when test is finished', () => {
    spyOn(testService, 'resetValues');
    spyOn(testService, 'getResults').and.callThrough();
    testPage.currentQuestion = 1;
    testPage.questionsNumber = 1;
    testPage.nextQuestion();
    expect(testService.resetValues).toHaveBeenCalled();
  });

  it('setResultTipsMessages should set messages according to yes or no result', () => {
    testPage.setResultTipsMessages('yes');
    expect(testPage.resultTipFirstPhrase).toEqual('SOFIApp cree que');
    expect(testPage.resultTipSecondPhrase).toEqual('es importante buscar apoyo');
    expect(testPage.resultTipThirdPhrase).toEqual('SOFIApp te apoya en la toma de decisiones');
    expect(testPage.resultTipFourthPhrase).toEqual('para evitar o poner fin a las violencias');
    expect(testPage.resultTipFifthPhrase).toEqual('y tiene unos consejos para tí');
    testPage.setResultTipsMessages('no');
    expect(testPage.resultTipFirstPhrase).toEqual('SOFIApp reconoce tus capacidades');
    expect(testPage.resultTipSecondPhrase).toEqual('para poner límites frente a las violencias');
    expect(testPage.resultTipThirdPhrase).toEqual('SOFIApp te ayuda a prevenir las violencias');
    expect(testPage.resultTipFourthPhrase).toEqual('y tiene información');
    expect(testPage.resultTipFifthPhrase).toEqual('muy importante para tí');
  });

});

