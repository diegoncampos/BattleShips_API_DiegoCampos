import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Player } from 'src/models/player';
import { PlayerService } from 'src/services/player/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  public addPlayer: boolean = false;
  @Input() players: Player[] = [];
  @Input() player: Player;
  @Output() playerChange = new EventEmitter<Player>();
  
  
  constructor(public playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayerList();
  }

  // Unsuscribe all Observables
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getPlayerList() {
    this.playerService.getPlayersList()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      if(data !== null && data.length > 0) {
        this.players = data;
      }
      else {
        this.addPlayer = true;
      }
    })
  }

  saveNewPlayer() {
    let newPlayer: Player = {id: 0, name: this.player.name, score: 0, gamesPlayed:0};
    this.playerService.newPlayer(newPlayer).subscribe(data => {
      this.players.push(data);
      this.player = data;
      this.playerChange.emit(data);
      this.addPlayer = false;
    })
  }
}
