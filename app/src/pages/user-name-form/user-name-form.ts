import {Component} from '@angular/core';
import {NavController, Loading, NavParams, LoadingController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";
import {MenuPage} from "../menu/menu";
import {LoginService} from "../../providers/login-service";
import {AlertCreator} from "../../providers/alert-creator";
import {Storage} from '@ionic/storage';
import {UserFactory} from "../../providers/user-factory";
import {UserService} from "../../providers/user-service";
import {NetworkStatusService} from "../../providers/network-status-service";
import {Platform} from 'ionic-angular';
import { File } from 'ionic-native';
import {OfflineService} from "../../providers/offline-service";

declare var cordova:any;

@Component({
  selector: 'page-user-name-form',
  templateUrl: './user-name-form.html'
})
export class UserNameFormPage {

  loading: Loading;
  form: FormGroup;
  userPassword: string;
  dataDirectory: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public  formBuilder: FormBuilder,
              public formValidator: FormValidator, private loginService: LoginService, public alertCreator: AlertCreator,
              public loadingController: LoadingController, public storage: Storage, private userFactory: UserFactory, private userService: UserService, public offlineService:OfflineService, public platform: Platform) {

    this.dataDirectory=cordova.file.dataDirectory;
    this.form = formBuilder.group({
      username: ['', Validators.required],
    });
    this.userPassword = this.navParams.get('pinNumber');
    this.loading = this.createLoading();
  }

  ionViewDidLoad() {
  }

  createLoading() {
    return this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });
  }

  login() {
    if (this.isUserNameValid()) {
      this.loading.present();
      this.makeLogin();
    }
  }

  makeLogin() {
    let user = this.userFactory.createUser({
      username: this.form.controls['username'].value,
      password: this.userPassword
    });

    if (!NetworkStatusService.isDeviceConnected()) {
      this.alertCreator.showCofirmationMessage("Error", "Asegurate de tener conexión a internet, o intentalo más tarde");
      return;
    }

    this.loginService.login(user, (data) => {
      this.userService.user = data;
      this.userService.user.password = this.userPassword;
      if(this.platform.is('cordova')){
        this.setOfflineContent();
      }else{
        this.goToMenuPage();
      }
    }, () => {
      this.hideLoading();
    });
  }

  setOfflineContent(){
    this.offlineService.getAllAppData().subscribe((data)=>{
      console.log("toda la data", data);
      this.writeFiles(data);
    },(err)=>{
      console.log("error get all data", err);
      this.goToMenuPage();
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
      this.goToMenuPage();
    }).catch((err)=>{
      console.log("error writeFiles", err);
      this.goToMenuPage();
    });
  }

  hideLoading() {
    this.loading.dismiss();
    this.loading = this.createLoading();
  }

  goBack() {
    this.navCtrl.pop();
  }

  isUserNameValid() {
    return this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor introduce tu nombre en la aplicación')
  }

  goToMenuPage() {
    this.hideLoading();
    this.storage.set('islogged', true);
    this.navCtrl.setRoot(MenuPage);
  }

}
