import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TacoPresenterComponent} from './taco-presenter.component';
import {TacoService} from '../taco-service/taco.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {EMPTY, of, throwError} from 'rxjs';
import {tacoTestData} from './taco-test-data';

describe('TacoPresenterComponent', () => {
  let component: TacoPresenterComponent;
  let fixture: ComponentFixture<TacoPresenterComponent>;
  let tacoServiceSpy: any;

  beforeEach(async () => {
    tacoServiceSpy = jasmine.createSpyObj('TacoService',
      ['getTacos']);

    await TestBed.configureTestingModule({
      declarations: [TacoPresenterComponent],
      providers: [
        {provide: TacoService, useValue: tacoServiceSpy}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacoPresenterComponent);
    component = fixture.componentInstance;

    tacoServiceSpy.getTacos.and.returnValue(EMPTY);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should say waiting when waiting for tacos', () => {
    const waitingElement: DebugElement = fixture.debugElement.query(By.css('[data-testid=no-taco]'));

    expect(waitingElement.nativeElement.innerText).toEqual('Waiting for tacos');
  });

  it('should have list tacos with length of tacos from service', () => {
    tacoServiceSpy.getTacos.and.returnValue(of(tacoTestData));
    component.ngOnInit();
    fixture.detectChanges();

    const tacoElements: DebugElement [] = fixture.debugElement.queryAll(By.css('.taco-area_taco'));

    expect(tacoElements.length).toEqual(tacoTestData.length);
  });

  it('should list tacos when different tacos are given by service', () => {
    const expectedFirstType = 'Glorious';
    tacoTestData[0].type = expectedFirstType;
    tacoServiceSpy.getTacos.and.returnValue(of(tacoTestData));
    component.ngOnInit();
    fixture.detectChanges();

    const tacoElements: DebugElement [] = fixture.debugElement.queryAll(By.css('.taco-area_taco'));

    expect(tacoElements[0].nativeElement.innerText).toEqual(`${expectedFirstType} taco`);
  });


  it('shows message after two seconds', async () => {


    await new Promise(resolve => setTimeout(resolve, 1200));

    fixture.detectChanges();


    const lateMessageElement: DebugElement = fixture.debugElement.query(By.css('[data-testid=late-message]'));
    expect(lateMessageElement.nativeElement.innerText).toEqual('Thanks for waiting!');
  });

  it('failed call shows error', () => {
    tacoServiceSpy.getTacos.and.returnValue(throwError(new Error('No tacos')));
    component.ngOnInit();
    fixture.detectChanges();

    const errorElement: DebugElement = fixture.debugElement.query(By.css('[data-testid=taco-error]'));

    expect(errorElement.nativeElement.innerText).toEqual('Failed to get data - No tacos today');
  });

  it('successful call does not show waiting', () => {
    tacoServiceSpy.getTacos.and.returnValue(of(tacoTestData));
    component.ngOnInit();
    fixture.detectChanges();

    const errorElements: DebugElement[] = fixture.debugElement.queryAll(By.css('[data-testid=no-taco]'));

    expect(errorElements.length).toEqual(0);
  });

  it('failed call does not show waiting', () => {
    tacoServiceSpy.getTacos.and.returnValue(throwError(new Error('No tacos')));
    component.ngOnInit();
    fixture.detectChanges();

    const errorElements: DebugElement[] = fixture.debugElement.queryAll(By.css('[data-testid=no-taco]'));

    expect(errorElements.length).toEqual(0);
  });
});
