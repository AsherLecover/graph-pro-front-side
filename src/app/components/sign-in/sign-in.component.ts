import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../servises/auth.service';



@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  submitted: boolean;


  constructor(
    private fb: FormBuilder,
    private authServise: AuthService

  ) { }

  ngOnInit(): void {

    this.signInForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]]
      });
  
  }

  onSubmit() {
    console.log(7687687687687);
    console.log(this.signInForm.value);
    this.signin()
    
    if (this.signInForm.valid) {
      this.submitted = true;
    }
  }

  signin() {
    this.authServise.signin(this.signInForm.value.email, this.signInForm.value.password).subscribe( data => {
      console.log(data);
    })
    
    }
    
    
  

}
