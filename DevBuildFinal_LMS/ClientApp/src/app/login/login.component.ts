import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() clicked = new EventEmitter<User>();
  @Input() user: User;
  allUsers: string[];
  loginUserName: string;
  loginUserPassword: string;
  is_invalidUser: boolean = false;

    /** Login ctor */
  constructor(private userData: UserDataService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers = function () {
    this.userData.getAllUsersNames().subscribe(
      (data: string[]) => {
        this.allUsers = data;
      },
      error => console.error(error)
    );
  }

  getUserByName = function () {
    this.userData.getUserByName(this.loginUserName).subscribe(
      (data: User) => {
        this.user = data;
        console.log(this.user)
        this.clicked.emit(this.user)
      },
      error => console.error(error)
    );
  }

  submitLogin = function () {
    if (this.allUsers.includes(this.loginUserName)) {
      this.getUserByName();
    }
    else {
      this.is_invalidUser = true;
    }
  }

  cancelLogin = function () {
    this.loginUserName = '';
    this.loginUserPassword = '';
  }

}
