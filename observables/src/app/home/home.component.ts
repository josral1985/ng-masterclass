import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {
    /* TODO document why this constructor is empty */
  }

  ngOnInit() {
    // creating our own observables

    //interval is a function of rxjs that returns an observable which we can subscribed to
    this.firstObsSubscription = interval(1000).subscribe((count) => {
      console.log(count);
    });

    //This alone could cause memory leaks. Just because we navigate out of the homeComponent doesn't stop the observable from emitting.
    // We need to unsubscribe. The subscribe() function returns a Subscription. So by creating a Subscription variable and setting it to the Subscription returned
    // by the observable... wwe can use it to unsubscribe on ngOnDestroy; navigate away from component.
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
