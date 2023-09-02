import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent {
  @Input() inputType: string = 'input';
  @Input() inputId!: string;
  @Input() type!: string;
  @Input() label!: string;
  @Input() formGroup!: FormGroup;

  dateMini = new Date();

  getFormControl(): FormControl {
    return this.formGroup.get(this.inputId) as FormControl;
  }

  isInvalidInput(formGroup: FormGroup, name: string): boolean {
    return !!formGroup.get(name)?.invalid && formGroup.get(name)!.touched;
  }
}
