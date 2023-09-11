import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent {
  @Input() label!: string;
  @Input() bgLinearGradient!: string;
  @Output() mouseover = new EventEmitter<void>();
  @Output() mouseleave = new EventEmitter<void>();



  onMouseOverButton() {
    this.mouseover.emit();
  }

  onMouseLeaveButton() {
    this.mouseleave.emit();
  }
}