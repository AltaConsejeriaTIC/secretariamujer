import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import { AlertCreator } from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {TestPage} from "./test-page";
import {TestsService} from "../../providers/tests-service";
import {SelectCategoryService} from "../../providers/select-category-service";


describe('TestPage tests', () => {

  let testPage: TestPage;
  let fixture : ComponentFixture<TestPage>;
  let alertCreator: AlertCreator;
  let testService: TestsService;
  let testSelectCategoryService:SelectCategoryService;


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [TestPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController,AlertCreator,AlertController,TestPage,TestsService,SelectCategoryService,
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

  beforeEach(inject([AlertCreator, TestsService,SelectCategoryService], (_alertCreator, _testService, _SelectCategoryService) => {
    alertCreator=_alertCreator;
    testService=_testService;
    testSelectCategoryService=_SelectCategoryService;
  }));

  it('loadQuestions should call getTestQuestions from TestsService', () => {
    spyOn(testService,'getTestQuestions').and.callThrough();
    testSelectCategoryService.setCategory('tests');
    testSelectCategoryService.setSelectedCategoryId(1);
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

