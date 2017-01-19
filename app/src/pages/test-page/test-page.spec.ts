import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import { AlertCreator } from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {TestPage} from "./test-page";
import {TestsService} from "../../providers/tests-service";
import {SelectCategoryService} from "../../providers/select-category-service";
import {UserDAO} from "../../providers/user-dao";


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
        App, Platform, Form, Keyboard, MenuController, NavController,AlertCreator,AlertController,TestPage,TestsService,SelectCategoryService,UserDAO,
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
    testPage.answerCurrentQuestion();
    expect(testService.addCurrentQuestionAnswerToTotalUserAnswers).toHaveBeenCalled();
  });

  it('nextQuestion should add by 1 current question variable if current question is different than questionnumber', () => {
    testPage.nextQuestion();
    expect(testPage.currentQuestion).toEqual(1);
  });

  it('nextQuestion should call getResults from TestService if current question is equal than questionnumber', () => {
    spyOn(testService,'getResults').and.callThrough();
    testPage.currentQuestion=1;
    testPage.questionsNumber=1;
    testPage.nextQuestion();
    expect(testService.getResults).toHaveBeenCalled();
  });

  it('nextQuestion should set isTestComplete to true if test was completed', () => {
    spyOn(testService,'getResults').and.callThrough();
    testPage.currentQuestion=1;
    testPage.questionsNumber=1;
    testPage.nextQuestion();
    expect(testPage.isTestComplete).toBe(true);
  });
  it('getAnswer should return yes if 1st checkbox is true, no if 2nd checkbox is true and maybe if 3rd checkbox is true', () => {
     testPage.answerCheckBoxArray=[true,false,false];
     testPage.getAnswer();
     expect(testPage.getAnswer()).toEqual('yes');
     testPage.answerCheckBoxArray=[false,true,false];
     testPage.getAnswer();
     expect(testPage.getAnswer()).toEqual('no');
     testPage.answerCheckBoxArray=[false,false,true];
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
    spyOn(testService,'resetValues');
    spyOn(testService,'getResults').and.callThrough();
    testPage.currentQuestion=1;
    testPage.questionsNumber=1;
    testPage.nextQuestion();
    expect(testService.resetValues).toHaveBeenCalled();
  });

  it('setResultTipsMessages should set messages according to yes or no result', () => {
    testPage.setResultTipsMessages('yes');
    expect(testPage.resultTipFirstPhrase).toEqual('Al parecer Sofía cree que');
    expect(testPage.resultTipThirdPhrase).toEqual('y tiene');
    expect(testPage.resultTipFourthPhrase).toEqual('unos consejos para tí');
    testPage.setResultTipsMessages('no');
    expect(testPage.resultTipFirstPhrase).toEqual('Al parecer Sofía no cree que');
    expect(testPage.resultTipThirdPhrase).toEqual('pero');
    expect(testPage.resultTipFourthPhrase).toEqual('tiene unos consejos para tí');
  });

});

