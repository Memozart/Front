import { Component, Input, Optional, Self } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent {
  @Input() inputId!: string;
  @Input() type: string = 'text';
  @Input() label!: string;
  @Input() formGroup!: FormGroup;

  getFormControl(): FormControl {
    return this.formGroup.get(this.inputId) as FormControl;
  }

  isInvalidInput(formGroup: FormGroup, name: string): boolean {
    return !!formGroup.get(name)?.invalid && formGroup.get(name)!.touched;
  }
}
