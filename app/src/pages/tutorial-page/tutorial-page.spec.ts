import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule, Haptic, LoadingController, Loading
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock, UserDAOMock} from '../../mocks';
import {RoutesDetailsPage} from "./routes-details";
import {Http, ConnectionBackend} from "@angular/http";
import {ContactSelectionPage} from "../contact-selection/contact-selection";
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";
import {ApplicationConfig} from "../../config";
import {FormValidator} from "../../providers/form-validator";
import {TutorialPage} from "./tutorial-page";
import { Storage } from '@ionic/storage';

describe('Tutorial page tests', () => {

  let tutorialPage: TutorialPage;
  let fixture: ComponentFixture<TutorialPage>;
  let stubAlertCreator = {
    showSimpleAlert: () => {
    }
  }
  let stubHaptic = {};
  let stubLoading = {
    present:()=>{}
  };
  let stubLoadingController={
    createLoading:()=>{},
    create:()=>{
      return {
        present:()=>{},
        dismiss:()=>{}
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TutorialPage, ContactSelectionPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, Http, ApplicationConfig,FormValidator, Storage,
        {provide: Config, useClass: ConfigMock}, {
          provide: ConnectionBackend,
          useClass: ConfigMock
        }, {provide: AlertCreator, useValue: stubAlertCreator}, {provide: Haptic, useValue: stubHaptic}, {provide: Loading, useValue: stubLoading},
        {provide: LoadingController, useValue: stubLoadingController}, {provide: UserDAO, useClass: UserDAOMock},
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialPage);
    tutorialPage = fixture.componentInstance;
  });

  it('tutorial image should have a path', () => {
    tutorialPage.setTutorialBackgroundImages();
    expect(tutorialPage.tutorialBackgrounds[0]).toEqual('url(assets/img/tutorial_images/tutorial_1.png)');
  });
});
