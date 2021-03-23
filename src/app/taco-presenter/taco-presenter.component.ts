import {Component, OnDestroy, OnInit} from '@angular/core';
import {TacoService} from '../taco-service/taco.service';
import {Taco} from '../taco';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-taco-presenter',
  templateUrl: './taco-presenter.component.html',
  styleUrls: ['./taco-presenter.component.css']
})
export class TacoPresenterComponent implements OnInit, OnDestroy {
  tacos: Taco [];

  tacoError = false;
  showLateMessage = false;

  subscriptions = new Subject<void>();

  constructor(private tacoService: TacoService) {
  }

  ngOnInit(): void {
    this.tacoService.getTacos().pipe(
      takeUntil(this.subscriptions)
    ).subscribe(
      tacos => {
        this.tacos = tacos;
      },
      () => {
        this.tacoError = true;
      }
    );

    setTimeout(() => {
      this.showLateMessage = true;
    }, 4000);
  }

  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }
}
