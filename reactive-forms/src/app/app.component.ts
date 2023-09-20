import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
        'username': new FormControl(null),  //formState null -> default value
        'email': new FormControl(null),
        'gender': new FormControl('male')
      })
  }
}
