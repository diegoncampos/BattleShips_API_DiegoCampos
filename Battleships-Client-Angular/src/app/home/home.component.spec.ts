import { async, ComponentFixture, inject, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { BoardService } from 'src/services/board/board.service';
import { Axles } from 'src/models/axles';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let el: HTMLElement;
  let fixture: ComponentFixture<HomeComponent>;
  let boardService;
  let homeComponent;
  let element;

  beforeEach(async(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
    platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ HomeComponent  ],
      imports:[ HttpClientTestingModule, HttpClientModule, FormsModule],
      providers: [BoardService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([BoardService], s => {
    boardService = s;
    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  it("should call createBoard and return list of Positions", async(() => {
    const response: Axles[] = [];
  
    spyOn(boardService, 'createBoard').and.returnValue(of(response))
  
    homeComponent.createBoard();
  
    fixture.detectChanges();
  
    expect(homeComponent.board).toEqual(response);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
