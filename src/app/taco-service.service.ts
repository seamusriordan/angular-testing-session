import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Taco} from './taco';

@Injectable({
  providedIn: 'root'
})
export class TacoServiceService {

  constructor() {
  }

  getTacos(): Observable<Taco[]> {
    return of([{
      type: 'Fancy'
    }]);
  }
}
