import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
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

  it('drawMarker should increase by 1 the markers array', () => {
    let markers: any[] = [];
    let map: any;
    let position: any;
    mapService.drawMarker(map, position, markers);
    expect(markers.length).toBe(1);
  });

  it('clearmarker should set markers array length to one', () => {
    let markers: any[] = [];
    let marker = {
      setMap: function (x) {
      }
    };
    markers.push(marker);
    markers.push(marker);
    mapService.clearMarker(markers);
    expect(markers.length).toBe(1);
  });

});
