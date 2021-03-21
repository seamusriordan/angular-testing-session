import {TestBed} from '@angular/core/testing';

import {TacoServiceService} from './taco-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Taco} from './taco';

describe('TacoServiceService', () => {
  let tacoService: TacoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    tacoService = TestBed.inject(TacoServiceService);
  });

  it('should be created', () => {
    expect(tacoService).toBeTruthy();
  });

  it('gets right number of tacos', () => {
    tacoService.getTacos().subscribe(
      tacos => {
        expect(tacos.length).toEqual(1);
      }
    );
  });

  it('gets correct taco', () => {
    let foundTacos: Taco [] = [];

    tacoService.getTacos().subscribe(
      tacos => {
        foundTacos = tacos;
      }
    );

    expect(foundTacos[0].type).toEqual('Fancy');

  });
});
