import {TestBed} from '@angular/core/testing';

import {TacoServiceService} from './taco-service.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Taco} from './taco';

describe('TacoServiceService', () => {
  let tacoService: TacoServiceService;
  let httpTestingController: HttpTestingController;
  const url = 'https://angular-testing-lesson.azurewebsites.net/api/tacodata';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    tacoService = TestBed.inject(TacoServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(tacoService).toBeTruthy();
  });

  it('gets right number of tacos with one taco', () => {
    const mockTacoTypes = ['Boring'];

    tacoService.getTacos().subscribe(
      tacos => {
        expect(tacos.length).toEqual(mockTacoTypes.length);
      }
    );

    const request = httpTestingController.expectOne(url);
    request.flush({types: mockTacoTypes});
  });


  it('gets correct taco', () => {
    const mockTacoTypes = ['Fancy'];
    let foundTacos: Taco [] = [];

    tacoService.getTacos().subscribe(
      tacos => {
        foundTacos = tacos;
      }
    );
    const request = httpTestingController.expectOne(url);
    request.flush({types: mockTacoTypes});

    expect(foundTacos[0].type).toEqual('Fancy');
  });

  it('gets right number of tacos with two tacos', async () => {
    const mockTacoTypes = ['Lovely', 'Fortuitous'];
    let foundLength = 0;

    tacoService.getTacos().subscribe(
      tacos => {
        foundLength = tacos.length;
      }
    );

    const request = httpTestingController.expectOne(url);
    request.flush({types: mockTacoTypes});

    await setInterval(() => {}, 500);

    expect(foundLength).toEqual(mockTacoTypes.length);
  });
});
