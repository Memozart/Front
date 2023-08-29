import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent {
  @Input() inputId!: string;
  @Input() formGroup!: FormGroup;
  @Input() type!: string;

  getFormControl(): FormControl {
    return this.formGroup.get(this.inputId) as FormControl;
  }
}
