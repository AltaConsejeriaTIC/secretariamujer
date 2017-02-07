import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  AlertController
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertCreator} from "../../providers/alert-creator";
import {ConfigMock, NavMock} from "../../mocks";
import {CalculatorPage} from "./calculator";
import {UserNameFormPage} from "../user-name-form/user-name-form";



describe('CalculatorPage tests', () => {

  let calculatorPage: CalculatorPage;
  let fixture: ComponentFixture<MenuPage>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, AlertCreator, AlertController,UserNameFormPage,
        {provide: Config, useClass: ConfigMock},{provide: NavController, useClass: NavMock},
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorPage);
    calculatorPage = fixture.componentInstance;
    calculatorPage.clear();
  });

  it('appendFunction should append selected number to display', () => {
    calculatorPage.append('3');
    calculatorPage.append('5');
    expect(calculatorPage.equation).toEqual('35');
  });

  it('isPinFunction should return false if equation has math character', () => {
    calculatorPage.append('3');
    calculatorPage.append('+');
    calculatorPage.append('5');
    expect(calculatorPage.isPin()).toEqual(false);
  });

  it('isPinFunction should return false if equation has more than 4 characters', () => {
    calculatorPage.append('3');
    calculatorPage.append('6');
    calculatorPage.append('5');
    calculatorPage.append('5');
    calculatorPage.append('5');
    expect(calculatorPage.isPin()).toEqual(false);
  });

  it('isPinFunction should return true if equation has 4 digits only', () => {
    calculatorPage.append('3');
    calculatorPage.append('6');
    calculatorPage.append('5');
    calculatorPage.append('5');
    expect(calculatorPage.isPin()).toEqual(true);
  });

  it('equalFunction should resolve the equation', () => {
    calculatorPage.append('3');
    calculatorPage.append('5');
    calculatorPage.append('+');
    calculatorPage.append('5');
    calculatorPage.equal();
    expect(calculatorPage.equation).toEqual('40');
    
  });

  it('equalFunction should display error message if the equation is wrong', () => {
    calculatorPage.append('3');
    calculatorPage.append('5');
    calculatorPage.append('+');
    calculatorPage.append('+');
    calculatorPage.append('5');
    calculatorPage.equal();
    expect(calculatorPage.equation).toEqual("Error - verifica tu operación");
  });

  it('calculator should delete result after operation, and user begins new equation', () => {
    calculatorPage.append('3');
    calculatorPage.append('+');
    calculatorPage.append('5');
    calculatorPage.equal();
    expect(calculatorPage.hasShowedResult).toEqual(true);
    calculatorPage.append('5');
    expect(calculatorPage.hasShowedResult).toEqual(false);

  });

});

