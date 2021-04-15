import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Axles } from '../../models/axles';


@Component({
  selector: 'app-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  @Input() board: Axles[];
  @Input() boardSize: any;

  public playBoard : Axles[];
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentBoard: SimpleChange = changes.board;
    this.playBoard = currentBoard.currentValue;
  }
}
