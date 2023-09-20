import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

    // Before grouping
    // this.signUpForm = new FormGroup({
    //   // add controls
    //   'username': new FormControl(null, Validators.required),  //formState null -> default value, Validator.required referenced (don't call the function)
    //   'email': new FormControl(null, [Validators.required, Validators.email]),
    //   'gender': new FormControl('male')
    // })

    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }
}
