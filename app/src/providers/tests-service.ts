import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {SelectCategoryService} from "./select-category-service";

@Injectable()
export class TestsService {

  totalUserAnswers:string[]=[];
  countedAnswers={
    yesAnswers:0,
    noAnswers:0
  };
  yesPercentage:number;
  noPercentage:number;

  constructor(public http: Http, public selectCategoryService:SelectCategoryService) {
  }

  getTestQuestions():Observable<Response>{
    let RESTAddress=this.selectCategoryService.getCategories()[this.selectCategoryService.getSelectedCategoryId()].RESTAddress;
    return  this.http.get('http://192.168.88.245:9000/'+RESTAddress+'?_format=json')
  }

  addCurrentQuestionAnswerToTotalUserAnswers(currentQuestionUserAnswers){
    this.totalUserAnswers.push(currentQuestionUserAnswers);
  }

  getTotalUserAnswers(){
    return this.totalUserAnswers;
  }

  getResults(){
    this.countAnswers();
    this.calculatePercentages();
    return (this.yesPercentage>=this.noPercentage ? 'yes':'no');
  }

  countAnswers(){
    for(let i=0; i<this.totalUserAnswers.length; i++){
      this.addAnswerToCorrespondingOption(i);
    }
  }

  addAnswerToCorrespondingOption(counter:number){
    if(this.totalUserAnswers[counter]=='yes' || this.totalUserAnswers[counter]=='maybe'){
      this.countedAnswers.yesAnswers++;
    }else{
      this.countedAnswers.noAnswers++;
    }
  }

  calculatePercentages(){
    this.yesPercentage=(this.countedAnswers.yesAnswers*100)/this.totalUserAnswers.length;
    this.noPercentage=(this.countedAnswers.noAnswers*100)/this.totalUserAnswers.length;
  }

  getNameCategoryById(): string{
    return this.selectCategoryService.getCategories()[this.selectCategoryService.getSelectedCategoryId()].category;
  }

  resetValues(){
    this.totalUserAnswers=[];
    this.countedAnswers={
      yesAnswers:0,
      noAnswers:0
    };
    this.yesPercentage=0;
    this.noPercentage=0;
  }

}


