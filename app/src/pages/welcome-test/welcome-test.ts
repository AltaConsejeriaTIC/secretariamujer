import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SelectCategoryService} from "../../providers/select-category-service";
import {SelectCategoryPage} from "../select-category/select-category";
import {MenuPage} from "../menu/menu";
import {UserDAO} from "../../providers/user-dao";
import {AttentionRoutesPage} from "../attention-routes/attention-routes";

@Component({
  selector: 'page-welcome-test',
  templateUrl: './welcome-test.html'
})
export class WelcomeTestPage {

  userName:string;

  constructor(public navController: NavController, public selectCategoyService: SelectCategoryService, public userDAO:UserDAO) {
    this.userName=this.userDAO.getUsername() || "Yabushita Mai";
  }

  ionViewDidLoad() {
    console.log('Hello WelcomeTestPage Page');
  }

  goToTestSelectTestCategory() {
    this.selectCategoyService.setCategory('tests');
    this.navController.push(SelectCategoryPage);
  }

  goToTips() {

  }

  goToRoutes() {
    this.navController.push(AttentionRoutesPage);
  }

  goToMenuPage() {
    this.navController.pop();
  }

}
