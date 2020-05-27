import { Component, Input } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
/** Home component*/
export class HomeComponent {
  user: User; 

  /** Home ctor */
  constructor() { }

  onClicked(user: User) {
    this.user = user;
  }

}
