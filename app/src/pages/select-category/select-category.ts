import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SelectCategoryService} from "../../providers/select-category-service";
import {category} from "../../entity/category";
import {TestPage} from "../test-page/test-page";

@Component({
  selector: 'page-select-category',
  templateUrl: './select-category.html'
})
export class SelectCategoryPage {

  categories: category[] = [];

  constructor(public navCtrl: NavController, public selectCategoryService: SelectCategoryService) {
    this.categories = this.selectCategoryService.fillCategoriesWithEmptyObjects();
  }

  ionViewDidLoad() {
    this.categories = this.selectCategoryService.getCategories();
  }

  selectCategory(categoryId: number) {
    this.selectCategoryService.setSelectedCategoryId(categoryId);
    this.navCtrl.push(TestPage);
  }

  goToMenuPage() {
    alert('sucess');
  }
}
