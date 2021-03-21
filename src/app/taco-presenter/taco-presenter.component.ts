import {Component, OnInit} from '@angular/core';
import {TacoService} from '../taco-service/taco.service';
import {Taco} from '../taco';

@Component({
  selector: 'app-taco-presenter',
  templateUrl: './taco-presenter.component.html',
  styleUrls: ['./taco-presenter.component.css']
})
export class TacoPresenterComponent implements OnInit {
  tacos: Taco [];

  waitingForTacos = true;
  tacoError = false;

  showLateMessage = false;

  constructor(private tacoService: TacoService) {
  }

  ngOnInit(): void {
    this.tacoService.getTacos().subscribe(tacos => {
        this.tacos = tacos;
        this.waitingForTacos = false;
      },
      () => {
        this.tacoError = true;
        this.waitingForTacos = false;
      }
    );

    setTimeout(() => {
      this.showLateMessage = true;
    }, 1000);
  }

  public isWaitingForTacos(): boolean {
    return this.waitingForTacos && !this.tacoError;
  }

}
