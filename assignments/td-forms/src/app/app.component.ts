import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from './model/subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') subsForm: NgForm;

  sub: Subscription = {
    email: '',
    password: '',
    type: ''
  }

  options: string[] = [
    'Basic',
    'Advanced',
    'Pro'
  ];

  defaultSubs: string;

  constructor() {
    this.defaultSubs = this.options[1];
  }
  
  onSubmit() {
    this.sub.email = this.subsForm.value.userData.email;
    this.sub.password = this.subsForm.value.userData.password;
    this.sub.type = this.subsForm.value.userData.subscription;

    console.log(this.sub);
  }
}
