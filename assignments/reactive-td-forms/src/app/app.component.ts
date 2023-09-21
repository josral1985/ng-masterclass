import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectInfo!: FormGroup;

  statuses: string[] = [
    'Stable',
    'Critical',
    'Finished'
  ];

  disallowedProjectNames: string[] = [
    'Test',
    'test'
  ];

  ngOnInit(): void {
      this.projectInfo = new FormGroup({
        'projectName': new FormControl(null, [Validators.required], this.func),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'status': new FormControl(null)
      })
  }

  disallowedNames(control: FormControl): {[s: string]: boolean}{
    if (this.disallowedProjectNames.indexOf(control.value) !== -1) {
      return {'nameNotAllowed': true};
    }
    return {};
  }

func(control: FormControl): Promise<any> | Observable<any> {
  const promise = new Promise<any>((res, _) => {
    setTimeout(() => {
      if (['Test', 'test'].includes(control.value)) {
        res({'nameNotAllowed': true});
      } else {
        res(null);
      }
    }, 1500);
  });
  return promise;
}

  onSubmit(){
    console.log(this.projectInfo.value);
  }
}
