import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
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

import { AuthService } from 'src/app/core/auth.service';


type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };
declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    styles: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    loginForm: FormGroup;
    formErrors: FormErrors = {
        'email': '',
        'password': '',
    };
    validationMessages = {
        'email': {
            'required': 'Email is required.',
            'email': 'Email must be a valid email',
        },
        'password': {
            'required': 'Password is required.',
            'pattern': 'Password must be include at one letter and one number.',
            'minlength': 'Password must be at least 4 characters long.',
            'maxlength': 'Password cannot be more than 40 characters long.',
        },
    };

    constructor(private element: ElementRef, private auth: AuthService, private router: Router, private fb: FormBuilder) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);

        this.loginForm = this.fb.group({
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])]
        });

    }
    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        const sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible === false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }

    async signInWithGoogle() {
        await this.auth.googleLogin();
        return await this.afterSignIn();
    }


    // Getters
    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }

    /// Shared

    /**
     * Login Method
     */
    async login() {
        await this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password']);
        console.log('Login Initialized');

        return await this.afterSignIn();
    }

    buildForm() {
        this.loginForm = this.fb.group({
            'email': ['', [
                Validators.required,
                Validators.email,
            ]],
            'password': ['', [
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6),
                Validators.maxLength(25),
            ]],
        });

        this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));
        this.onValueChanged(); // reset validation messages
    }



    private afterSignIn() {
        // Do after login stuff here, such router redirects, toast messages, etc.
        console.log('Redirect Begun');

        return this.router.navigate(['/dashboard']);
    }

    // Updates validation state on form changes.
    onValueChanged(data?: any) {
        if (!this.loginForm) { return; }
        const form = this.loginForm;
        for (const field in this.formErrors) {
            if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    if (control.errors) {
                        for (const key in control.errors) {
                            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                                this.formErrors[field] += `${(messages as { [key: string]: string })[key]} `;
                            }
                        }
                    }
                }
            }
        }
    }
}
