import { Component } from '@angular/core';
import { User } from '../interfaces/User';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
/** Login component*/
export class LoginComponent {

  userName: string;
    /** Login ctor */
  constructor(private router: Router) {}

  submitLogin() {
    if (this.userName == '') {
      return;
    }

    let userLogin: User = {
      userTypeId: 3,
      userName: this.userName
    }

    //this.characterData.addPlayer(newPlayer).subscribe();
    this.router.navigate(['home']);
  }

}
