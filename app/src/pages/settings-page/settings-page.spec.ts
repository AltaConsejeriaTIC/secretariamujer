import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule, Haptic, LoadingController, Loading
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock, UserDAOMock} from '../../mocks';
import {RoutesDetailsPage} from "./routes-details";
import {Http, ConnectionBackend} from "@angular/http";
import {SettingsPage} from "./settings-page";
import {ContactSelectionPage} from "../contact-selection/contact-selection";
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";
import {ApplicationConfig} from "../../config";
import {FormValidator} from "../../providers/form-validator";
import { Storage } from '@ionic/storage';
import {UserService} from "../../providers/user-service";



describe('settingsPage tests', () => {

  let settingsPage: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;
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

  const SETTINGS_SLIDE_ITEMS = 3;
  const WRITE_CURRENT_PIN = 1;
  const WRITE_NEW_PIN = 2;
  const CONFIRM_NEW_PIN = 3;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPage, ContactSelectionPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, Http, ApplicationConfig,FormValidator,Storage,UserService,
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
    fixture = TestBed.createComponent(SettingsPage);
    settingsPage = fixture.componentInstance;
  });

  it('all options should be hidden when page starts', () => {
    settingsPage.setInitialIconState();
    expect(settingsPage.isOptionVisible[0]).toEqual(false);
  });

  it('all options should have down icon', () => {
    settingsPage.setInitialIconState();
    expect(settingsPage.arrowIconArray[0]).toEqual("icon-border-down-arrow");
  });

  it('selected option should have up icon', () => {
    settingsPage.toggleisShowingOptions(1);
    expect(settingsPage.arrowIconArray[1]).toEqual("icon-border-up-arrow");
  });

  it('the others options should have down icon', () => {
    settingsPage.toggleisShowingOptions(1);
    expect(settingsPage.arrowIconArray[0]).toEqual("icon-border-down-arrow");
  });

  it('when user digits his current pin number and it is correct, input label should be: enter new pin', () => {
    settingsPage.inputPin = "0000";
    settingsPage.changePinState = WRITE_CURRENT_PIN;
    settingsPage.changePin();
    expect(settingsPage.instructionText).toEqual(settingsPage.instructionTextArray[1]);
  });

  it('when user digits his new pin number and it is a number, input label should be: confirm new pin', () => {
    settingsPage.inputPin = "3333";
    settingsPage.changePinState = WRITE_NEW_PIN;
    settingsPage.changePin();
    expect(settingsPage.instructionText).toEqual(settingsPage.instructionTextArray[2]);
  });

  it('when user digits his confirmation pin number and it is the same, input label should be: enter your four digits pin', () => {
    settingsPage.inputPin = "3333";
    settingsPage.newPin = "3333";
    settingsPage.changePinState = CONFIRM_NEW_PIN;
    settingsPage.changePin();
    expect(settingsPage.instructionText).toEqual(settingsPage.instructionTextArray[0]);
  });

  it('when user digits his confirmation pin number and it is the same, current pin must be updated', () => {
    settingsPage.inputPin = "3333";
    settingsPage.newPin = "3333";
    settingsPage.changePinState = CONFIRM_NEW_PIN;
    settingsPage.changePin();
    expect(settingsPage.currentPin).toEqual(settingsPage.newPin);
  });
});
