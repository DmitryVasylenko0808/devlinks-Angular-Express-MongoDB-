import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {AuthService} from "./auth.service";
import {Link, User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private url: string = 'http://localhost:3000/api/links';
  private links: Link[] = [];

  linksSub: Subject<any> = new Subject<any>();
  onSaveLinks: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient,
              private authService: AuthService) {

  }

  fetchAll(): Observable<any> {
    return this.http.get<any>(`${this.url}`,
      { headers: {
        'Authorization': `Bearer ${this.authService.getToken()}`
        }
      })
      .pipe(
        tap(({ links }) => {
          this.links = links;
        })
      )
  }

  saveChanges(links: Link[]): Observable<any> {
    const formData = new FormData();
    return this.http.post<any>(this.url, links, {
      headers: {
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    })
      .pipe(
        tap(({ links }) => {
          this.links = links;
        })
      )
  }

  setLinks(links: Link[]) {
    this.links = links;
  }

  getLinks() {
    return this.links;
  }
}
