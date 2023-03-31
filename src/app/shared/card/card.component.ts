import { Component, Input } from '@angular/core';
import { Theme } from 'src/app/models/theme';
import { Card } from './../../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() theme!: Theme;
}
