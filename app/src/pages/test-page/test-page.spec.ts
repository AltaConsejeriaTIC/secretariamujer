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

  it('nextQuestion should increment currentQuestion by 1 if currentQuestion is lower than questionsNumber', () => {
    testPage.nextQuestion();
    expect(testPage.currentQuestion).toBe(1);
  });

  it('changeButtonNameIfIsLastQuestion should change button text if currentQuestion is equal to questionsNumber', () => {
    testPage.currentQuestion=1;
    testPage.questionsNumber=1;
    testPage.changeButtonNameIfIsLastQuestion();
    expect(testPage.buttonText).toBe("Finalizar");
  });

  it('addCurrentQuestionUserAnswers should call addCurrentQuestionUserAnswers from testService', () => {
    spyOn(testService,'addCurrentQuestionUserAnswers').and.callThrough();
    testPage.nextQuestion();
    expect(testService.addCurrentQuestionUserAnswers).toHaveBeenCalled();
  });

  it('resetAnswerCheckBoxArray should set answer array back to all false', () => {
    testPage.answerCheckBoxArray=[false,false,true];
    testPage.resetAnswerCheckBoxArray();
    expect(testPage.answerCheckBoxArray[2]).toBe(false);
  });

});

