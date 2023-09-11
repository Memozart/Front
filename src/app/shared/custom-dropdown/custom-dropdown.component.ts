import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent {
  @Input() options!: any[];
  @Input() label!: string;
  @Input() value!: string;
  @Input() selectedValue: any;
  @Input() inputId!: string;
  @Input() formGroup!: FormGroup;
  @Output() selectionChange = new EventEmitter<any>();

  getFormControl(): any {
    return this.formGroup.get(this.inputId) as FormControl;
  }

  onSelectionChange(event: any) {
    this.selectionChange.emit(event.value);
  }

}
