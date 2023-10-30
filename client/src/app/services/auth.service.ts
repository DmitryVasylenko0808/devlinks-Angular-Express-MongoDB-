import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {lastValueFrom, Observable, pipe, Subject, tap} from "rxjs";
import {CanActivateFn} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:3000/api/users';
  private avatarSrc: string = 'http://localhost:3000/static/avatars';
  private token: string = '';
  private user: User | null = null;

  onSaveUser = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<any> {
    const formData = new FormData();
    for(let [key, value] of Object.entries(user)) {
      formData.append(key, value);
    }

    return this.http.post<any>(`${this.url}/register`, formData);
  }

  login(login: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);

    return this.http.post<any>(`${this.url}/login`, formData)
      .pipe(tap(({ token }) => {
        localStorage.setItem('token', token);
        this.token = token;
      }));
  }

  fetchUser(): Observable<any> {
    return this.http.get<any>(`${this.url}/me`,
      { headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
      .pipe(
        tap(({ userData }) => {
          this.user = userData;
        })
      )
  }

  saveChanges(user: User): Observable<any> {
    const formData = new FormData();
    for(let [key, value] of Object.entries(user)) {
      formData.append(key, value);
    }

    return this.http.patch<any>(`${this.url}/save`, formData,
      { headers: {
        'Authorization': `Bearer ${this.token}`
        }
      })
      .pipe(
        tap(({ userData }) => {
          this.user = userData;
        })
      )
  }

  isAuthorized(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.token = '';
    localStorage.clear();
  }

  getToken(): string {
    return this.token;
  }

  getAvatarSrc(): string {
    return  this.avatarSrc;
  }

  getUser(): User | null {
    return this.user;
  }
}
