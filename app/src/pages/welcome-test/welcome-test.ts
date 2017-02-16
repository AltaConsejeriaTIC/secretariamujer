import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SelectTestCategoryPage} from "../select-test-category/select-test-category";
import {UserDAO} from "../../providers/user-dao";
import {AttentionRoutesPage} from "../attention-routes/attention-routes";
import {SelectTipsCategoryPage} from "../select-tips-category/select-tips-category";
import {UserService} from "../../providers/user-service";
import {CallNumber} from "ionic-native";
import {AlertCreator} from "../../providers/alert-creator";

@Component({
  selector: 'page-welcome-test',
  templateUrl: './welcome-test.html'
})
export class WelcomeTestPage {

  userName: string;

  constructor(public navController: NavController, public userDAO: UserDAO, private userService:UserService, public alertCreator: AlertCreator,) {
    this.userName = this.userService.user.username|| "Yabushita Mai";
  }

  ionViewDidLoad() {
  }

  callPurpleNumber(){
    CallNumber.callNumber('018000112137', true)
      .then(() => {
      })
      .catch(() => {
        this.alertCreator.showSimpleAlert("Error", "No es posible hacer la llamada en este momento");
      });
  }

  goToTestSelectTestCategory() {
    this.navController.push(SelectTestCategoryPage);
  }

  goToTips() {
    this.navController.push(SelectTipsCategoryPage);
  }

  goToRoutes() {
    this.navController.push(AttentionRoutesPage);
  }

  goBackPage(){
    this.navController.pop();
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

}
