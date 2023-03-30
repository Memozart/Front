import { Component, Input } from '@angular/core';
import { Card } from './../../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() card!: Card;
  @Input() openConfirmDialog!: () => void;
  boxShadow!: string;
  hoverEdit: boolean = false;
  hoverDel: boolean = false;

  func(bool: boolean) {
    return `background: ${this.card.theme.darkColor};
    border: 0;
    boxShadow: ${
      bool
        ? 'inset 3px 3px 4px ' +
          this.card.theme.darkShadow +
          ', inset -2px -2px 4px ' +
          this.card.theme.lightShadow +
          ''
        : '2px 2px 4px ' +
          this.card.theme.darkShadow +
          ', -1px -1px 4px ' +
          this.card.theme.lightShadow +
          ''
    } `;
  }
}
