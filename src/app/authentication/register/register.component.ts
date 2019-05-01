import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-register-cmp',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  registerForm: FormGroup;
  detailForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');

    // Register Form Start
    this.registerForm = this.fb.group({
      _email: ['', [Validators.required]],
      _password: ['', Validators.required]
    });

    this.detailForm = this.fb.group({
      _displayName: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
  }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }


  /// Shared

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    return this.router.navigate(['dashboard']);
  }

  /// Getters
  get displayName() { return this.registerForm.get('_displayName'); }
  get email() { return this.registerForm.get('_email'); }
  get password() { return this.registerForm.get('_password'); }


  /// Handlers
  signup() {
    console.log('Email: ', this.email.value);
    console.log('PW: ', this.password.value);

    return this.auth.emailSignUp(this.email.value, this.password.value);
  }

  setDetails(user) {
    return this.auth.updateUser(user, { displayName: this.displayName.value });
  }

}
