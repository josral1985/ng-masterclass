import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  // Property to hold Form
  signUpForm: FormGroup;

  ngOnInit(): void {
    //this.signUpForm = new FormGroup({});  // create empty form without any controls
    this.signUpForm = new FormGroup({
      // add controls
      'username': new FormControl(null, Validators.required),  //formState null -> default value, Validator.required referenced (don't call the function)
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('male')
    })
  }

  onSubmit() {
    console.log(this.signUpForm);
  }
}
