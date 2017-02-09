import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import {WelcomeTestPage} from "./welcome-test";
import {UserDAO} from "../../providers/user-dao";
import {UserService} from "../../providers/user-service";

describe('WelcomeTestPage tests', () => {

  let testWelcomePage: WelcomeTestPage;
  let fixture : ComponentFixture<TestPage>;
  let testNavController:NavController;
  let stubNavController = {push: (page) => {}};


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [WelcomeTestPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController,WelcomeTestPage,UserDAO,UserService,
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

  beforeEach(inject([WelcomeTestPage, NavController], (_welcomeTestPage,_navController) => {
    testWelcomePage=_welcomeTestPage;
    testNavController=_navController;
  }));

});

