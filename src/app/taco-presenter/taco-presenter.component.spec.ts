import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacoPresenterComponent } from './taco-presenter.component';

describe('TacoPresenterComponent', () => {
  let component: TacoPresenterComponent;
  let fixture: ComponentFixture<TacoPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacoPresenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacoPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
