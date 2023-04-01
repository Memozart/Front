import { Component, Input } from '@angular/core';
import { Theme } from 'src/app/models/theme';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class ThemeComponent {
  @Input() theme!: Theme;
}
