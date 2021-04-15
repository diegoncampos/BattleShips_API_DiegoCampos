import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from 'src/models/player';
import { PlayerService } from 'src/services/player/player.service';
import { BoardService } from 'src/services/board/board.service';
import { Axles } from '../../models/axles';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  private ngUnsubscribe = new Subject();

  private numOfGuesses: number = 20;
  public rowsQuantity: number = 8;
  public columnsQuantity: number = 8;
  public restart: boolean = false;

  public axles: Axles = { x: null, y: null };
  public guesses: number = this.numOfGuesses;

  public board: Axles[] = [];
  public shipsAxles: Axles[] = [];

  public message = { message: '', color: '' };
  public messages = [
    { message: 'Hot', color: 'red' },
    { message: 'Warm', color: 'orange' },
    { message: 'Cold', color: 'blue' },
    { message: 'Hited!', color: 'green' },
    { message: 'Congrats you win!', color: 'green' },
    { message: 'GAME OVER', color: 'red' }
  ];

  public player: Player = {id: null, name: null, score: null, gamesPlayed: null};

  constructor(
    public playerService: PlayerService,
    public boardService: BoardService
    ) {}

  ngOnInit() {
    this.createBoard();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updatePlayer(_player: Player) {
    this.playerService.updatePlayer(_player)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      console.log("updated");
    })
  }

  createBoard() {
    this.boardService.createBoard()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(res => {
      this.board = res;

      res.forEach(element => {
        if(element.hasShip == true) {
          this.shipsAxles.push(element)
        }
      });
    });
  }

  attack() {
    this.message = { message: '', color: '' };
    if (this.guesses > 0 && this.axles.x != null && this.axles.y != null) {
      this.guesses = this.guesses - 1;
      this.boardService.attack(this.axles.x, this.axles.y)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {

        this.checkNearest(this.axles.x, this.axles.y)

        // If ship was hited delete it
        let position = res.find(element => element.x == this.axles.x && element.y == this.axles.y);
        if (position.hasShip && position.attacked) {
          // position.hasShip = false;
          let index = this.shipsAxles.findIndex(element => element.x == this.axles.x && element.y == this.axles.y);
          this.shipsAxles.splice(index, 1);
          console.log("Borro", this.shipsAxles)
          // If you don't have more ships the game ends. You win.
          if (this.shipsAxles.length == 0) {
            this.message = this.messages[4];
            this.restart = true;
            this.player.score ++;
            this.player.gamesPlayed ++;
            this.updatePlayer(this.player);
          }
        }
        // If don't have more guesses show game over.
        if (this.guesses == 0) {
          this.message = this.messages[5];
          this.restart = true;
          this.player.gamesPlayed ++;
          this.updatePlayer(this.player);
        }
        this.board = JSON.parse(JSON.stringify(res));
      })
    }
  }

  checkNearest(x: number, y: number) {
    let ranges: number[] = [];
    this.shipsAxles.forEach(elem => {
      let range = (Math.abs(x - elem.x)) + Math.abs((elem.y - y));
      ranges.push(range);
    })
    this.showMessage(ranges);
  }

  showMessage(ranges: number[]) {
    // Get nearest
    let min = Math.min(...ranges);
    switch (true) {
      case min == 1 || min == 2:
        this.message = this.messages[0];
        break;
      case min == 3 || min == 4:
        this.message = this.messages[1];
        break;
      case min > 4:
        this.message = this.messages[2];
        break;
      case min == 0:
        this.message = this.messages[3];
        break;
    }
  }

  restartPlay() {
    this.guesses = this.numOfGuesses;
    this.axles = { x: null, y: null };
    this.message = { message: '', color: '' };
    this.shipsAxles = [];
    this.board = [];
    this.createBoard();
    this.restart = false;
  }
}
