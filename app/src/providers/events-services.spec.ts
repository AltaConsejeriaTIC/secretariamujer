import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {EventsServices} from './events-services';
import {MockBackend} from '@angular/http/testing';
import {Observable} from "rxjs/Observable";



describe('EventsServices test', () => {

  let eventsServices: EventsServices;
  let mockbackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [EventsServices,  { provide: XHRBackend, useClass: MockBackend}]
    });
  });

  beforeEach(inject([EventsServices, XHRBackend], (_eventsServices,_mockbackend) => {
    eventsServices = _eventsServices;
    mockbackend=_mockbackend;
  }));

  it('registerEvent should return an observable', () => {
    let isObservable = eventsServices.registerEvent() instanceof Observable;
    expect(isObservable).toBe(true);
  });

  it('should return mocked response for registerEvent (async)', async(() => {
    let response = {
      "response":"ok"
    };

    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(response)})));
    });

    eventsServices.registerEvent().map(res=>res.json()).subscribe(response => {
      expect(response.response).toBe("ok");
    });
  }));

});
