import { Component } from '@angular/core';
import { User } from '../interfaces/User';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
/** Login component*/
export class LoginComponent {

  users: string[];
  newUserName: string;
  newUserPassword: string;
  is_invalidUser: boolean = false;

    /** Login ctor */
  constructor(private userData: UserDataService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers = function () {
    this.userData.getAllUsersNames().subscribe(
      (data: string[]) => {
        this.users = data;
        console.log(this.users)
      },
      error => console.error(error)
    );
  }

  submitLogin = function () {
    console.log(this.newUserName)
    if (this.users.includes(this.newUserName)) {
      this.router.navigate(['home']);
    }
    else {
      this.is_invalidUser = true;
    }
  }

  cancelLogin = function () {
    this.newUserName = '';
    this.newUserPassword = '';
  }

}


console.log(['joe', 'jane', 'mary'].includes('jane'));
