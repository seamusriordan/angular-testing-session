import {TestBed} from '@angular/core/testing';

import {TacoService} from './taco.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TacoService', () => {
  let tacoService: TacoService;
  let httpTestingController: HttpTestingController;
  const url = 'https://angular-testing-lesson.azurewebsites.net/api/tacodata';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    tacoService = TestBed.inject(TacoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(tacoService).toBeTruthy();
  });

  it('gets correct taco', (done) => {
    const mockTacoTypes = ['Fancy'];

    tacoService.getTacos().subscribe(
      tacos => {
        expect(tacos[0].type).toEqual('Fancy');
        done();
      }
    );
    const request = httpTestingController.expectOne(url);
    request.flush({types: mockTacoTypes});
  });

  it('gets right number of tacos with one taco', (done) => {
    const mockTacoTypes = ['Boring'];

    tacoService.getTacos().subscribe(
      tacos => {
        expect(tacos.length).toEqual(mockTacoTypes.length);
        done();
      }
    );

    const request = httpTestingController.expectOne(url);
    request.flush({types: mockTacoTypes});
  });

  it('gets right number of tacos with two tacos', (done) => {
    const mockTacoTypes = ['Lovely', 'Fortuitous'];
    let foundLength = 0;

    tacoService.getTacos().subscribe(
      tacos => {
        foundLength = tacos.length;
        expect(foundLength).toEqual(mockTacoTypes.length);
        done();
      }
    );

    const request = httpTestingController.expectOne(url);
    request.flush({types: mockTacoTypes});
  });
});
