import {TestBed, inject, async} from "@angular/core/testing";
import {HttpModule, XHRBackend, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from '@angular/http/testing';
import {Observable} from "rxjs/Observable";
import {TestsService} from "./tests-service";


describe('testsService tests', () => {
  let mockbackend;
  let testsService:TestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        TestsService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  beforeEach(inject([TestsService, XHRBackend], (_TestsService, _mockbackend) => {
    testsService = _TestsService;
    mockbackend = _mockbackend;
  }));

  it('should return mocked response for getTestQuestions (async)', async(() => {
    let response = [
      {
        "body": "añadir pregunta 3",
        "field_answer1": "resp a",
        "field_answer2": "resp b",
        "field_answer3": "resp c",
        "field_answer4": "resp d",
        "field_answer5": "resp e",
        "field_answer6": "resp f"
      },
      {
        "body": "esto es una pregunta",
        "field_answer1": "la respuesta numero 1",
        "field_answer2": "la respuesta numero 2",
        "field_answer3": "la respuesta numero 3",
        "field_answer4": "la respuesta numero 4",
        "field_answer5": "la respuesta numero 5",
        "field_answer6": "la respuesta numero 6"
      },
    ];
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(response)})));
    });

    testsService.getTestQuestions().map(res=>res.json()).subscribe(response => {
      expect(response[0].body).toBe("añadir pregunta 3");
    });
  }));

  it('should getTestQuestions function return an Observable type',()=>{
    let isObservable = testsService.getTestQuestions() instanceof Observable;
    expect(isObservable).toBe(true);
  });

  it('addCurrentQuestionAnswersToTotalUserAnswers should add current question answers to totalUserAnswers',()=>{
    let currentQuestionUserAnswers=[1,2];
    testsService.addCurrentQuestionAnswersToTotalUserAnswers(currentQuestionUserAnswers);
    expect(testsService.totalUserAnswers.length).toBe(1);
    expect(testsService.totalUserAnswers[0]).toEqual([1,2]);
  });

  it('getTotalUserAnswers should return totalUserAnswers array',()=>{
    let currentQuestionUserAnswers=[1,2];
    testsService.addCurrentQuestionAnswersToTotalUserAnswers(currentQuestionUserAnswers);
    let totalUserAnswers=testsService.getTotalUserAnswers();
    expect(totalUserAnswers.length).toBe(1);
  });

});

