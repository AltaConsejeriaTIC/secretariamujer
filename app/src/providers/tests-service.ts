import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {ApplicationConfig} from "../config";

@Injectable()
export class TestsService {

  totalUserAnswers:string[]=[];
  countedAnswers={
    yesAnswers:0,
    noAnswers:0
  };
  yesPercentage:number;
  noPercentage:number;

  constructor(public http: Http) {
  }

  getTestQuestions(RESTAddress):Observable<Response>{
    let url = ApplicationConfig.getURL('/'+RESTAddress+'?_format=json');
    return  this.http.get(url);
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


