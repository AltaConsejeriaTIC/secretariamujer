import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {category} from "../entity/category";

/*
 Generated class for the SelectCategoryService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SelectCategoryService {
  categories:category[];
  testCategories:category[] = [
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

  tipsCategories:category[]  = [
    {
      category: 'Violencia Económica',
      RESTAddress: 'el que sea'
    },
    {
      category: 'Violencia Físca',
      RESTAddress: 'el que sea'
    },
    {
      category: 'Violencia Psicológica',
      RESTAddress: 'el que sea'
    },
    {
      category: 'Violencia Sexual',
      RESTAddress: 'el que sea'
    }
  ];

  routesCategories:category[] =[
    {
      category: 'Medidas de protección',
      RESTAddress: 'el que sea'
    },
    {
      category: 'Salud',
      RESTAddress: 'el que sea'
    },
    {
      category: 'Justicia',
      RESTAddress: 'el que sea'
    },
    {
      category: 'Información',
      RESTAddress: 'el que sea'
    }
  ];

  constructor() {

  }

  fillCategoriesWithEmptyObjects(){
    let emptyObject={
      category: '',
      RESTAddress: ''
    };
    let emptyCategoriesArray:category[]=[];
    for(let i=0; i<4; i++){
      emptyCategoriesArray.push(emptyObject);
    }
    return emptyCategoriesArray;
  }

  setCategory(category: string) {
    switch (category) {
      case 'tests':
        this.categories = this.testCategories;
        break;

      case 'tips':
        this.categories = this.tipsCategories;
        break;

      case 'routes':
        this.categories = this.routesCategories;
        break;
    }
  }

  getCategories() {
    return this.categories;
  }

}
