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

  constructor(private tacoService: TacoService) {
  }

  ngOnInit(): void {
    this.tacoService.getTacos().subscribe(tacos => {
      this.tacos = tacos;
    });
  }

}
