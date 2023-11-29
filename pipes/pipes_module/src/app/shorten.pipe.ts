import { Pipe, PipeTransform } from '@angular/core';

//Decorator is needed!
@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  // creating a custom pipe

  // needed method to correctly implement PipeTransform
  transform(value: any) {
    if (value.length > 10) {
      return value.substr(0, 10) + ' ...'; //will give the first 10 characters
    }
    return value;
  }
}
