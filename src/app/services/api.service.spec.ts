import { TestBed, async } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Countries } from '../models/country';

describe('ApiService', () => {

  let component: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    })
    component = TestBed.get(ApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get all countries', () => {
    component.getCountries()
      .subscribe(countries => {
        expect(countries).toBeTruthy('No countries returned');
      });

      const req = httpTestingController.expectOne('http://localhost:53897/api/SmsProviders/Countries');
      expect(req.request.method).toEqual("GET");
      req.flush({payload: Object.values(Countries)});
  })

  afterEach(() => {
    httpTestingController.verify();
  })

});
