import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {EventsServices} from './events-services';
import {MockBackend} from '@angular/http/testing';



describe('EventsServices test', () => {

  let eventsServices: EventsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [EventsServices],
    });
  });

  beforeEach(inject([EventsServices], _eventsServices => {
    eventsServices = _eventsServices;
  }));

  it('registerEvent should be defined', () => {
    expect(eventsServices.registerEvent).toBeDefined();
  });

});
