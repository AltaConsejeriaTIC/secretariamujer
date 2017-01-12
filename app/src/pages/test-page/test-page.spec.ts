import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import { AlertCreator } from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {TestPage} from "./test-page";
import {TestsService} from "../../providers/tests-service";


describe('TestPage tests', () => {

  let testPage: TestPage;
  let fixture : ComponentFixture<TestPage>;
  let alertCreator: AlertCreator;
  let testService: TestsService;


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [TestPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController,AlertCreator,AlertController,TestPage,TestsService,
        {provide: Config, useClass: ConfigMock}
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(()=>{
    fixture=TestBed.createComponent(TestPage);
    testPage=fixture.componentInstance;
  });

  beforeEach(inject([AlertCreator, TestsService], (_alertCreator, _testService) => {
    alertCreator=_alertCreator;
    testService=_testService;
  }));

  it('loadQuestions should call getTestQuestions from TestsService', () => {
    spyOn(testService,'getTestQuestions').and.callThrough();
    testPage.loadQuestions();
    expect(testService.getTestQuestions).toHaveBeenCalled();
  });

  it('answerCurrentQuestion should call addCurrentQuestionAnswerToTotalUserAnswers from TestsService', () => {
    spyOn(testService,'addCurrentQuestionAnswerToTotalUserAnswers').and.callThrough();
    testPage.answerCurrentQuestion('yes');
    expect(testService.addCurrentQuestionAnswerToTotalUserAnswers).toHaveBeenCalled();
  });

  it('nextQuestion should add by 1 current question variable if current question is different than questionnumber', () => {
    testPage.nextQuestion();
    expect(testPage.currentQuestion).toEqual(1);
  });

  it('nextQuestion should call getResults from TestService if current question is equal than questionnumber', () => {
    spyOn(testService,'getResults').and.callThrough();
    spyOn(alertCreator,'showSimpleAlert');
    testPage.currentQuestion=1;
    testPage.questionsNumber=1;
    testPage.nextQuestion();
    expect(testService.getResults).toHaveBeenCalled();
  });

  it('nextQuestion should set isTestComplete to true if test was completed', () => {
    spyOn(testService,'getResults').and.callThrough();
    spyOn(alertCreator,'showSimpleAlert');
    testPage.currentQuestion=1;
    testPage.questionsNumber=1;
    testPage.nextQuestion();
    expect(testPage.isTestComplete).toBe(true);
  });

});

