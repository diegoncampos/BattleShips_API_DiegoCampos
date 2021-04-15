import { element } from 'protractor';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let de: DebugElement;
  let el: HTMLElement;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [ HomeComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the board', async(() => {
    expect(component.createBoard()).not.toEqual([])
  }))

  it('should add Random Ships', async(() => {
    expect(component.shipsAxles).not.toEqual([])
  }
  ));

  it('should attack on selected axles', async(() => {
    component.axles = { x: 2, y: 2 };
    component.board = [{x: 2, y: 2, hasShip: false, attacked: true}]
    expect(component.axles).toEqual({ x: 2, y: 2 })
    expect(component.attack).call
    expect(component.board).toEqual([{x: 2, y: 2, hasShip: false, attacked: true}])
  }))

  it('should Attack', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'attack');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.attack).toHaveBeenCalledTimes(0);
  }));

});
