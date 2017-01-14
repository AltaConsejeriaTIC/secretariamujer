import {TestBed, inject, async} from "@angular/core/testing";
import {Observable} from "rxjs/Observable";
import {TestsService} from "./tests-service";
import {SelectCategoryService} from "./select-category-service";


describe('selectCategoryService tests', () => {
  let testSelectCategoryService:SelectCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SelectCategoryService,
      ]
    });
  });

  beforeEach(inject([SelectCategoryService], (_SelectCategoryService) => {
    testSelectCategoryService = _SelectCategoryService;
  }));

  it('setCategories should set 4 categories in categories Array',()=>{
    let categories=['1','2','3','4'];
    testSelectCategoryService.setCategories(categories);
    expect(testSelectCategoryService.categories.length).toBe(4);
  });

  it('getCategories should return categories array',()=>{
    let categories=['4','3','2','1'];
    testSelectCategoryService.setCategories(categories);
    expect(testSelectCategoryService.getCategories()).toEqual(['4','3','2','1']);
  });

});

