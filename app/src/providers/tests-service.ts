import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class TestsService {

  totalUserAnswers:string[]=[];

  constructor(public http: Http) {
  }

  getTestQuestions():Observable<Response>{
    return  this.http.get('http://192.168.88.245:9000/preguntas-violencia-economica?_format=json')
  }

  addCurrentQuestionAnswerToTotalUserAnswers(currentQuestionUserAnswers){
    this.totalUserAnswers.push(currentQuestionUserAnswers);
  }

  getTotalUserAnswers(){
    return this.totalUserAnswers;
  }

  getResults(){
    let yesOrMaybeCounter:number=0;
    let noCounter:number=0;

    for(let i=0; this.totalUserAnswers.length<=i; i++){
      if(this.totalUserAnswers[i]=='yes' || this.totalUserAnswers[i]=='maybe'){
        yesOrMaybeCounter++;
      }else{
        noCounter++;
      }
    }
  }

}
