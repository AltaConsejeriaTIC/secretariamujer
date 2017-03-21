import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {IUser, User} from '../../entity/user';
import {AlertCreator} from "../../providers/alert-creator";
import {UserDAO} from "../../providers/user-dao";
import {RegisterOptionalInfoPage} from "../register-optional-info/register-optional-info";
import {UserService} from "../../providers/user-service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";
import {NetworkStatusService} from "../../providers/network-status-service";
import {Platform} from 'ionic-angular';
import { File } from 'ionic-native';
import {OfflineService} from "../../providers/offline-service";
declare var cordova:any;


@Component({
  selector: 'page-required-info-form',
  templateUrl: './required-info-form.html'
})
export class RequiredInfoFormPage {

  user: IUser;
  loading: Loading;
  form: FormGroup;
  username: string;
  password: string;
  dataDirectory: string;

  constructor(public navCtrl: NavController, public alertCreator: AlertCreator, public userDAO: UserDAO, private userService: UserService, public loadingController: LoadingController, private  formBuilder: FormBuilder, public formValidator: FormValidator,public offlineService:OfflineService, public platform: Platform) {
    this.dataDirectory=cordova.file.dataDirectory;
    this.user = new User();
    this.loading = this.createLoading();
    this.createForm(formBuilder);
  }

  ionViewDidLoad() {

  }

  private createForm(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])]
    });
  }


  createLoading(): Loading {
    return this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });
  }

  hideLoading() {
    this.loading.dismiss();
    this.loading = this.createLoading();
  }


  checkInputValues() {
    if (this.isUserDataValid()) {
      this.loading.present();
      this.saveRequiredInfo();
    }
  }

  isUserDataValid() {
    let isDataValid: boolean = this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor ingresa un nombre de usuario, máximo 30 caracteres') && this.formValidator.IsValidPassword(this.form.controls['password'], 'Por favor ingresa un PIN de 4 dígitos') && this.formValidator.IsValidCharPassword(this.form.controls['password'], 'Por favor ingresa un PIN con caracteres numéricos');
    return isDataValid;
  }

  saveRequiredInfo() {
    this.userService.user.username = this.form.controls['username'].value;
    this.userService.user.password = this.form.controls['password'].value;
    this.registerUser();
  }

  registerUser() {
    if (!NetworkStatusService.isDeviceConnected()) {
      this.alertCreator.showCofirmationMessage("Error", "Asegurate de tener conexión a internet, o intentalo más tarde");
      return;
    }

    this.userDAO.create()
      .subscribe(userId => {
        this.userService.user.id = userId;
        this.alertCreator.showCofirmationMessage('Cuenta', 'Tu cuenta ha sido creada', () => {

          if(this.platform.is('cordova')){
            this.setOfflineContent();
          }else{
            this.hideLoading();
            this.navCtrl.push(RegisterOptionalInfoPage);
          }

        })
      }, error => {
        this.hideLoading();
        console.log(error.name);
        if (error.name == 'UsernameAlreadyTaken') {
          this.alertCreator.showCofirmationMessage('Usuario', this.userService.user.username + ' ya ha sido registrado en el sistema');
        }

        if (error.name == 'ForbiddenCharacter') {
          this.alertCreator.showCofirmationMessage('Usuario','El nombre de usuario no puede contener caracteres especiales');
        }

      });
  }

  setOfflineContent(){
    this.offlineService.getAllAppData().subscribe((data)=>{
      console.log("toda la data", data);
      this.writeFiles(data);
    },(err)=>{
      console.log("error get all data", err);
      this.hideLoading();
      this.navCtrl.push(RegisterOptionalInfoPage);
    });

  }

  writeFiles(data){
    Promise.all([
      File.writeFile(this.dataDirectory,'categoriesTitles.txt',data[0],{replace:true}),
      File.writeFile(this.dataDirectory,'testOneQuestions.txt',data[1],{replace:true}),
      File.writeFile(this.dataDirectory,'testTwoQuestions.txt',data[2],{replace:true}),
      File.writeFile(this.dataDirectory,'testThreeQuestions.txt',data[3],{replace:true}),
      File.writeFile(this.dataDirectory,'testFourQuestions.txt',data[4],{replace:true}),
      File.writeFile(this.dataDirectory,'tipsOne.txt',data[5],{replace:true}),
      File.writeFile(this.dataDirectory,'tipsTwo.txt',data[6],{replace:true}),
      File.writeFile(this.dataDirectory,'tipsThree.txt',data[7],{replace:true}),
      File.writeFile(this.dataDirectory,'tipsFour.txt',data[8],{replace:true}),
      File.writeFile(this.dataDirectory,'infoRoutes.txt',data[9],{replace:true}),
      File.writeFile(this.dataDirectory,'healthRoutes.txt',data[10],{replace:true}),
      File.writeFile(this.dataDirectory,'justiceRoutes.txt',data[11],{replace:true}),
      File.writeFile(this.dataDirectory,'protectionRoutes.txt',data[12],{replace:true}),
      File.writeFile(this.dataDirectory,'aboutSDMU.txt',data[13],{replace:true}),
      File.writeFile(this.dataDirectory,'aboutSOFIA.txt',data[14],{replace:true}),
      File.writeFile(this.dataDirectory,'aboutApp.txt',data[15],{replace:true}),
    ]).then(()=>{
      this.hideLoading();
      this.navCtrl.push(RegisterOptionalInfoPage);
    }).catch((err)=>{
      console.log("error writeFiles", err);
      this.hideLoading();
      this.navCtrl.push(RegisterOptionalInfoPage);
    });
  }

  userCanContinue() {
    return this.form.controls['username'].valid && this.form.controls['password'].valid
  }

  userCanNotContinue() {
    return !this.form.controls['username'].valid || !this.form.controls['password'].valid
  }

  goBack() {
    this.navCtrl.pop();
  }


}
