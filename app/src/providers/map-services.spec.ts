import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {MapServices} from './map-services';


describe('MapService test', () => {

  let mapService: MapServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [MapServices],
    });
  });

  beforeEach(inject([MapServices], s => {
    mapService = s;
  }));
  
});
