import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  AlertController
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertCreator} from "../../providers/alert-creator";
import {ConfigMock} from "../../mocks";
import {CalculatorPage} from "./calculator";



describe('CalculatorPage tests', () => {

  let calculatorPage: CalculatorPage;
  let fixture: ComponentFixture<MenuPage>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, AlertCreator, AlertController,
        {provide: Config, useClass: ConfigMock},
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
  });

  it('addFunction should add two numbers', () => {
    calculatorPage.number1=1;
    calculatorPage.number2=4;
    expect(calculatorPage.add()).toBe(5);
  });

  it('substractFunction should substract two numbers', () => {
    calculatorPage.number1=8;
    calculatorPage.number2=2;
    expect(calculatorPage.subtract()).toBe(6);
  });

  it('productFunction should multiplicate two numbers', () => {
    calculatorPage.number1=5;
    calculatorPage.number2=4;
    expect(calculatorPage.product()).toBe(20);
  });

  it('divideFunction should divide two numbers', () => {
    calculatorPage.number1=100;
    calculatorPage.number2=2;
    expect(calculatorPage.divide()).toBe(50);
  });

  it('equalFunction should call add function if selected operation is add', () => {
    calculatorPage.number1=100;
    calculatorPage.number2=50;
    calculatorPage.operation=calculatorPage.operations.Add;
    expect(calculatorPage.equal()).toBe(150);
  });

  it('equalFunction should call substract function if selected operation is substract', () => {
    calculatorPage.number1=100;
    calculatorPage.number2=50;
    calculatorPage.operation=calculatorPage.operations.subtract;
    expect(calculatorPage.equal()).toBe(50);
  });

  it('equalFunction should call product function if selected operation is product', () => {
    calculatorPage.number1=10;
    calculatorPage.number2=5;
    calculatorPage.operation=calculatorPage.operations.product;
    expect(calculatorPage.equal()).toBe(50);
  });

  it('equalFunction should call divide function if selected operation is divide', () => {
    calculatorPage.number1=100;
    calculatorPage.number2=50;
    calculatorPage.operation=calculatorPage.operations.divide;
    expect(calculatorPage.equal()).toBe(2);
  });

  it('clearFunction should set both numbers and operation to null', () => {
    calculatorPage.number1=100;
    calculatorPage.number2=50;
    calculatorPage.operation=calculatorPage.operations.divide;
    calculatorPage.clear();
    expect(calculatorPage.number1).toBe(null);
    expect(calculatorPage.number2).toBe(null);
    expect(calculatorPage.operation).toBe(null);
  });

  it('should clear both numbers and operation after operation', () => {
    calculatorPage.number1=100;
    calculatorPage.number2=50;
    calculatorPage.operation=calculatorPage.operations.divide;
    calculatorPage.equal();
    expect(calculatorPage.number1).toBe(null);
    expect(calculatorPage.number2).toBe(null);
    expect(calculatorPage.operation).toBe(null);
  });

});

