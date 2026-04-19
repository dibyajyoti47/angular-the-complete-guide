import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if( control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMArk: true };
}

function emailIsUnique(control: AbstractControl) {
  if(control.value !== "test@example.com") {
    return of(null);
  }
  return of({ notUnique: true })
}

let initialEmailValue = "";
const savedForm = window.localStorage.getItem("saved-login-form");

if(savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  
  private destroy = inject(DestroyRef);

  emailFormControl = new FormControl( initialEmailValue, {
    validators: [Validators.required, Validators.email],
    asyncValidators: [emailIsUnique]
  });
  passwordFormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
  });
  
  loginform = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl
  });

  get emailIsInvalid () {
    return this.loginform.controls.email.touched && this.loginform.controls.email.dirty && this.loginform.controls.email.invalid;
  }

  get passwordInvalid () {
    return this.loginform.controls.password.touched && this.loginform.controls.password.dirty && this.loginform.controls.password.invalid;
  }


  ngOnInit(): void {
    
    const sub = this.loginform.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem("saved-login-form", JSON.stringify({email: value.email}));
      }
    });
    this.destroy.onDestroy(() => { sub.unsubscribe(); });
  }

  onSubmit() {
    console.log(this.loginform);
    const enteredEmail = this.loginform.value.email;
    const enteredPassword = this.loginform.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}
