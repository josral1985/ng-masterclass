import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  // Property to hold Form
  signUpForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

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
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),  // "this" on the function is called by angular so it needs to be bound
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    
    // Status & Value changes (Form or individual control)
    // this.signUpForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value)
    //   }
    // )
    this.signUpForm.statusChanges.subscribe(
      (value) => {
        console.log(value);
      }
    )
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  // A validator is just a function
  forbiddenNames(control: FormControl): {[s: string]: boolean} { // returning a key value object
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;  // should be null (NOT FALSE)
  }

  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((res, rej) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          res({'emailIsForbidden': true});
        } else {
          res(null)
        }
      }, 1500);
    });
    return promise
  }
}
