import {Component, OnDestroy, OnInit} from '@angular/core';
import {TacoService} from '../taco-service/taco.service';
import {Taco} from '../taco';

@Component({
  selector: 'app-taco-presenter',
  templateUrl: './taco-presenter.component.html',
  styleUrls: ['./taco-presenter.component.css']
})
export class TacoPresenterComponent implements OnInit, OnDestroy {
  tacos: Taco [];

  tacoError = false;
  showLateMessage = false;

  constructor(private tacoService: TacoService) {
  }

  ngOnInit(): void {
    this.tacoService.getTacos().subscribe(
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

  public isWaitingForTacos(): boolean {
    return !this.tacos && !this.tacoError;
  }

  ngOnDestroy(): void {
  }
}
