import {TestBed, inject, async} from "@angular/core/testing";
import {FormValidator} from "./form-validator";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AlertCreatorMock} from "../mocks";
import {AlertCreator} from "./alert-creator";



describe('formValidator tests', () => {
  let formValidator:FormValidator;
  let form: FormGroup;
  let formBuilder:FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      providers: [
        FormValidator, Validators, FormBuilder,
        {provide: AlertCreator, useClass:AlertCreatorMock}
      ]
    });
  });

  beforeEach(inject([FormValidator, FormBuilder], (_FormValidator, _FormBuilder) => {
    formValidator = _FormValidator;
    formBuilder=_FormBuilder;

    this.form = formBuilder.group({
      fullName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.pattern('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$)')])],
      cellPhone: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(10)])],
      username: ['', Validators.required],
    });

  }));


  it('isValidField should return true if the field is valid',()=>{
    this.form.controls['fullName'].setValue('Correct Name');
    expect(formValidator.isValidField(this.form.controls['fullName'],'Test')).toBe(true);
  });

  it('isValidField should return false if the field is invalid',()=>{
    this.form.controls['fullName'].setValue('Correct Name12121');
    expect(formValidator.isValidField(this.form.controls['fullName'],'Test')).toBe(false);
  });

  it('isValidName should return true if the name is valid',()=>{
    this.form.controls['fullName'].setValue('Correct Name');
    expect(formValidator.isValidField(this.form.controls['fullName'],'Test')).toBe(true);
  });

  it('isValidName should return false if the name is invalid',()=>{
    this.form.controls['fullName'].setValue('inorrect Name12121');
    expect(formValidator.isValidField(this.form.controls['fullName'],'Test')).toBe(false);
  });

  it('isValidPhone should return true if the phone is valid',()=>{
    this.form.controls['cellPhone'].setValue('123456');
    expect(formValidator.isValidField(this.form.controls['cellPhone'],'Test')).toBe(true);
  });

  it('isValidPhone should return false if the phone is invalid',()=>{
    this.form.controls['cellPhone'].setValue('inorrect phone');
    expect(formValidator.isValidField(this.form.controls['cellPhone'],'Test')).toBe(false);
  });

  it('isValidPhone should return false if the phone has more than 10 digits',()=>{
    this.form.controls['cellPhone'].setValue('12345678901');
    expect(formValidator.isValidField(this.form.controls['cellPhone'],'Test')).toBe(false);
  });

  it('isValidEmail should return true if the email is valid',()=>{
    this.form.controls['email'].setValue('test@test.com');
    expect(formValidator.isValidField(this.form.controls['email'],'Test')).toBe(true);
  });

  it('isValidEmail should return false if the email is invalid',()=>{
    this.form.controls['email'].setValue('inorrectemail.com');
    expect(formValidator.isValidField(this.form.controls['email'],'Test')).toBe(false);
  });

  it('isValidUserName should return true if the username is not empty',()=>{
    this.form.controls['username'].setValue('test@test.com');
    expect(formValidator.isValidField(this.form.controls['username'],'Test')).toBe(true);
  });

  it('isValidUserName should return false if the username is empty',()=>{
    this.form.controls['username'].setValue('');
    expect(formValidator.isValidField(this.form.controls['username'],'Test')).toBe(false);
  });




});
