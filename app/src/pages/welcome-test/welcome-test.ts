import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SelectCategoryService} from "../../providers/select-category-service";
import {SelectTestCategoryPage} from "../select-test-category/select-test-category";
import {UserDAO} from "../../providers/user-dao";
import {AttentionRoutesPage} from "../attention-routes/attention-routes";
import {SelectTipsCategoryPage} from "../select-tips-category/select-tips-category";

@Component({
  selector: 'page-welcome-test',
  templateUrl: './welcome-test.html'
})
export class WelcomeTestPage {

  userName: string;

  constructor(public navController: NavController, public selectCategoyService: SelectCategoryService, public userDAO: UserDAO) {
    this.userName = this.userDAO.getUsername() || "Yabushita Mai";
  }

  ionViewDidLoad() {
    console.log('Hello WelcomeTestPage Page');
  }

  goToTestSelectTestCategory() {
    this.selectCategoyService.setCategory('tests');
    this.navController.push(SelectTestCategoryPage);
  }

  goToTips() {
    this.navController.push(SelectTipsCategoryPage);
  }

  goToRoutes() {
    this.navController.push(AttentionRoutesPage);
  }

  goToMenuPage() {
    this.navController.pop();
  }

}
