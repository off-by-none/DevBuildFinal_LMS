import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, NewUser } from './interfaces/User';

@Injectable({ providedIn: 'root' })

export class UserDataService {
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(`/api/user`);
  }

  getTeachers() {
    return this.http.get<User[]>(`/api/user/teachers`);
  }

  getAllUsersNames() {
    return this.http.get<string[]>(`/api/user/names`);
  }

  getUserByName(userName: string) {
    return this.http.get<User>(`/api/user/name/${userName}`);
  }

  addUser(newUser: NewUser) {
    return this.http.post<NewUser>(`/api/user/add`, newUser);
  }

}
