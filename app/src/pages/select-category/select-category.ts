import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SelectCategoryService} from "../../providers/select-category-service";
import {category} from "../../entity/category";
import {TestPage} from "../test-page/test-page";
import {MenuPage} from "../menu/menu";

@Component({
  selector: 'page-select-category',
  templateUrl: './select-category.html'
})
export class SelectCategoryPage {

  categories: category[] = [
    {
      category: 'Violencia Económica',
      RESTAddress: 'preguntas-violencia-economica'
    },
    {
      category: 'Violencia Físca',
      RESTAddress: 'preguntas-violencia-fisica'
    },
    {
      category: 'Violencia Psicológica',
      RESTAddress: 'preguntas-violencia-psicologica'
    },
    {
      category: 'Violencia Sexual',
      RESTAddress: 'preguntas-violencia-sexual'
    }
  ];

  constructor(public navController: NavController, public selectCategoryService: SelectCategoryService) {
    this.categories = this.selectCategoryService.fillCategoriesWithEmptyObjects();
  }

  ionViewDidLoad() {
    this.categories = this.selectCategoryService.getCategories();
  }

  selectCategory(categoryId: number) {
    this.selectCategoryService.setSelectedCategoryId(categoryId);
    this.navController.push(TestPage);
  }

  goToMenuPage() {
    this.navController.push(MenuPage);
  }
}
