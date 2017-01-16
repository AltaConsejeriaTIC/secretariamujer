import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import {WelcomeTestPage} from "./welcome-test";
import {SelectCategoryService} from "../../providers/select-category-service";

describe('WelcomeTestPage tests', () => {

  let testWelcomePage: WelcomeTestPage;
  let fixture : ComponentFixture<TestPage>;
  let testSelectCategoryService:SelectCategoryService;
  let testNavController:NavController;
  let stubNavController = {push: (page) => {}};


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [WelcomeTestPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController,WelcomeTestPage,SelectCategoryService,
        {provide: Config, useClass: ConfigMock},{provide:NavController, useValue:stubNavController}
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(()=>{
    fixture=TestBed.createComponent(WelcomeTestPage);
    testWelcomePage=fixture.componentInstance;
  });

  beforeEach(inject([WelcomeTestPage, SelectCategoryService, NavController], (_welcomeTestPage, _selectCategoryService,_navController) => {
    testWelcomePage=_welcomeTestPage;
    testSelectCategoryService=_selectCategoryService;
    testNavController=_navController;
  }));

  it('goToTestPage should call setCategory from SelectCategoryService', () => {
    spyOn(testSelectCategoryService,'setCategory').and.callThrough();
    spyOn(testNavController,'push');
    testWelcomePage.goToTestSelectTestCategory();
    expect(testSelectCategoryService.setCategory).toHaveBeenCalled();
  });

});

