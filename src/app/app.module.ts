import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TacoPresenterComponent } from './taco-presenter/taco-presenter.component';

@NgModule({
  declarations: [
    AppComponent,
    TacoPresenterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
