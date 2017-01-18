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

  it('buildMap should return a map instance', () => {
    let element: any;
    let mapInstance = mapService.buildMap(element);
    expect(mapInstance).toEqual({Map: 'map'});
  });

  it('getUserLocation should return a promise type', () => {
    expect(mapService.getUserLocation() instanceof Promise).toBe(true);
  });

  it('convertToLatLng should return an array', () => {
    let position = {
      coords: {
        latitude: 1,
        longitude: 1
      }
    };
    expect(mapService.convertToLatLng(position)[0]).toBe(1);
  });

  it('drawEventMarker should increase by 1 the markers array', () => {
    let markers: any[] = [];
    let map: any;
    let position: any;
    mapService.drawEventMarker(map, position, markers);
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
