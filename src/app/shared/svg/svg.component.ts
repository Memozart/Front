import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css'],
})
export class SvgComponent implements OnInit {
  icon!: string;

  @Input('icon') set setIcon(_icon: string) {
    this.icon = './assets/icons.svg#' + _icon;
  }

  ngOnInit(): void {}
}
