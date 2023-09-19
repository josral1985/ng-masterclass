import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'pet'; //one of the available options
  answer = "";
  genders = ['male', 'female'];
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: ""
      },
      secret: "pet",
      questionAnswer: "",
      gender: "male"
    });
  }

  // onSubmit(form: NgForm) {
  //   //whatever the user entered
  //   console.log(form);
  // }

  //ViewChild
  onSubmit() {
    console.log(this.signupForm);
  }
}
