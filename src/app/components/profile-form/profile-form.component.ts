import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent {
  @Output() onContinue = new EventEmitter<object>();

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hobbie: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    dui: new FormControl(''),
    
  })

  continue(event: any) {
    event.preventDefault();
    this.onContinue.emit(this.formGroup.value);
  }
}
