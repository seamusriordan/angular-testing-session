import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Taco} from '../taco';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TacoServiceService {

  constructor(private httpClient: HttpClient) {
  }

  private tacoUrl = 'https://angular-testing-lesson.azurewebsites.net/api/tacodata';

  private static createTacoOfType(type: string): Taco {
    return {type};
  }

  getTacos(): Observable<Taco[]> {
    const result: Observable<any> = this.httpClient.get(this.tacoUrl);
    return result.pipe(
      map(response =>
        response.types.map(TacoServiceService.createTacoOfType)
      )
    );
  }
}
