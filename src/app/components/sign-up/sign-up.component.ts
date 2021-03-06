import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servises/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;
  errorFromServerEmailExists: string = '';

  constructor(
    private fb: FormBuilder,
     private authServise: AuthService,
     private router: Router,
     ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          ),
        ],
      ],
    });
  }

  onSubmit() {

    if (this.registerForm.valid) {
      this.signup();
      // this.submitted = true;
    }
  }

  signup() {
    console.log('register datails: ', this.registerForm.value);
    this.authServise
      .signup(
        this.registerForm.value.username,
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .subscribe(
        (data) => {
          if (this.registerForm.valid) {
            console.log('data:::', data);
            
            this.submitted = true;

            if(data){
              this.router.navigate(["/sign-in"])
            }
          }
        },
        (error) => {
          console.log('eeee:', error.error);

          this.errorFromServerEmailExists = error.error.message;
          console.log('error from servic: ', this.errorFromServerEmailExists);
        }
      );
  }
}
