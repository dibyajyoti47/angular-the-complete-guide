import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function equalValues(val1: string, val2: string) {
  return (control: AbstractControl) => {
    const val11 = control.get(val1)?.value;
    const val22 = control.get(val2)?.value;
    return val11 === val22 ? null : { notSame: '' };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3)],
        }),
      },
      {
        validators: [equalValues("password", "confirmPassword")],
      },
    ),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),

    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: [Validators.required],
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl<boolean>(false, {
      validators: [Validators.required],
    }),
  });
  onSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }
  }
  onReset() {
    this.form.reset();
  }
}
