import {TestBed, inject} from "@angular/core/testing";
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

  it('fillCategoriesWithEmptyObjects should return an array of 4 elements and empty',()=>{
    expect(testSelectCategoryService.fillCategoriesWithEmptyObjects().length).toBe(4);
    expect(testSelectCategoryService.fillCategoriesWithEmptyObjects()[0].category).toEqual('');
    expect(testSelectCategoryService.fillCategoriesWithEmptyObjects()[0].RESTAddress).toEqual('');

  });

  it('setCategory should set categories object',()=>{
    testSelectCategoryService.setCategory('tests');
    expect(testSelectCategoryService.categories.length).toBe(4);
  });

  it('getCategories should return categories array',()=>{
    testSelectCategoryService.setCategory('tests');
    expect(testSelectCategoryService.getCategories()).toEqual([
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
    ]);
  });

  it('setSelectedCategoryId and getSelectedCategoryId should set and get SelectedCategoryId',()=>{
    testSelectCategoryService.setSelectedCategoryId(3);
    expect(testSelectCategoryService.getSelectedCategoryId()).toBe(3);
  });

});

