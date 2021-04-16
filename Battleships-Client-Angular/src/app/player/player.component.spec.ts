import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';
import { Player } from 'src/models/player';
import { PlayerService } from 'src/services/player/player.service';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let playerService;
  let playerComponent;
  let element;

  beforeEach(async(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
    platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ PlayerComponent ],
      imports:[HttpClientTestingModule, HttpClientModule],
      providers: [PlayerService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([PlayerService], s => {
    playerService = s;
    fixture = TestBed.createComponent(PlayerComponent);
    playerComponent = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call getPlayersList and return list of Players", async(() => {
    const response: Player[] = [];
  
    spyOn(playerService, 'getPlayersList').and.returnValue(of(response))
  
    playerComponent.getPlayerList();
  
    fixture.detectChanges();
  
    expect(playerComponent.players).toEqual(response);
  }));
});
