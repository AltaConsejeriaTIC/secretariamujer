import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";
import {Storage} from '@ionic/storage';
import {MenuPage} from "../menu/menu";
import {UserFactory} from "../../providers/user-factory";
import {LoginService} from "../../providers/login-service";
import {AlertCreator} from "../../providers/alert-creator";
import {UserDAO} from "../../providers/user-dao";
import {UserService} from "../../providers/user-service";
import {NetworkStatusService} from "../../providers/network-status-service";
import { File } from 'ionic-native';
import {CategoryTitles} from "../../providers/category-titles";
import {TestsService} from "../../providers/tests-service";
import {OfflineService} from "../../providers/offline-service";

declare var cordova:any;

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {

  form: FormGroup;
  loading: Loading;
  dataDirectory: string;


  constructor(public navCtrl: NavController, private  formBuilder: FormBuilder, public formValidator: FormValidator,
              public storage: Storage, public loadingController: LoadingController, private userFactory: UserFactory,
              private loginService: LoginService, public alertCreator: AlertCreator, private userDAO: UserDAO,
              private userService: UserService, public categoryTitles:CategoryTitles, public testService:TestsService, public offlineService:OfflineService) {
    this.dataDirectory=cordova.file.dataDirectory;
    this.createForm(formBuilder);
    this.loading = this.createLoading();

  }

  ionViewDidLoad() {

  }

  private createForm(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      userPassword: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(4), Validators.required])],
      username: ['', Validators.required],
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
      this.makeLogin();
    }
  }

  makeLogin() {
    let user = this.userFactory.createUser({
      username: this.form.controls['username'].value,
      password: this.form.controls['userPassword'].value,
    });

    if (this.isDeviceConnected()) {
      this.loginService.login(user, (data) => {
        this.userService.user = data;
        this.userService.user.password = this.form.controls['userPassword'].value;
        this.setOfflineContent();
      }, () => {
        this.hideLoading();
      });
    }
  }

  isDeviceConnected() {
    if (!NetworkStatusService.isDeviceConnected()) {
      this.alertCreator.showCofirmationMessage("Error", "Asegurate de tener conexión a internet, o intentalo más tarde");
    }

    return NetworkStatusService.isDeviceConnected();
  }

  setUserInfoInTheApp(userId: string) {
    this.userDAO.get(userId).subscribe(user => {

    }, error => {
      console.log(error);
      this.hideLoading();
      this.alertCreator.showCofirmationMessage('Error', 'No fue posible obtener la informacion del usuario, intenta mas tarde');
    });

  }

  isUserDataValid(): boolean {
    let isDataValid: boolean = this.formValidator.IsValidPassword(this.form.controls['userPassword'], 'Verifica que el PIN sea correcto') && this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor ingresa tu nombre en la aplicación');
    return isDataValid;
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

    ]).then(()=>{
      this.goToMenuPage();
    }).catch((err)=>{
      console.log("error writeFiles", err);
      this.goToMenuPage();
    });
  }

  goToMenuPage() {
    this.hideLoading();
    this.storage.set('islogged', true);
    this.storage.set('isFirstTimeOpen', false);
    this.navCtrl.setRoot(MenuPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
