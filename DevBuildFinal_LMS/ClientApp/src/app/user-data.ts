import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './interfaces/User';

@Injectable({ providedIn: 'root' })

export class UserDataService {
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(`/api/user`);
  }

  getAllUsersNames() {
    return this.http.get<string[]>(`/api/user/names`);
  }
}
