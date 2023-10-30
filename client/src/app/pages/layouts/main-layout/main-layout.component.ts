import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Link, User} from "../../../interfaces";
import {concat, Observable, Subject, Subscription, switchMap} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {LinksService} from "../../../services/links.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  avatarFile: string = '';
  user: User | null = null;
  links: Link[] = [];

  fetchUserSub!: Subscription;
  fetchAllLinksSub!: Subscription;
  onSaveUserSub!: Subscription;
  onSaveLinksSub!: Subscription;

  constructor(private authService: AuthService,
              private linksService: LinksService,
              private router: Router) {
  }

  ngOnInit() {
    this.getUser();
    this.getLinks();

    this.onSaveUserSub = this.authService.onSaveUser.subscribe(data => { this.onSubmitSaveUser(data) });
    this.onSaveLinksSub = this.linksService.onSaveLinks.subscribe(data => { this.onSubmitSaveLinks(data) });
  }

  ngOnDestroy() {
    this.fetchUserSub.unsubscribe();
    this.fetchAllLinksSub.unsubscribe();
    this.onSaveUserSub.unsubscribe();
    this.onSaveLinksSub.unsubscribe();
  }

  getUser() {
    this.fetchUserSub = this.authService.fetchUser().
    subscribe({
      next: data => {
        const { userData } = data;
        if (userData.avatarFile) {
          this.avatarFile = `${this.authService.getAvatarSrc()}/${userData.avatarFile}`;
        }

        this.user = {
          firstName: userData.firstName,
          secondName: userData.secondName,
          email: userData.email,
          avatarFile: this.avatarFile
        };
      }
    });
  }

  getLinks() {
    this.fetchAllLinksSub = this.linksService.fetchAll()
      .subscribe({
        next: data => {
          this.links = data.links;
          this.linksService.linksSub.next(this.links);
        }
      })
  }

  onLogout() {
    this.avatarFile = 'assets/avatar.jpg';
    this.user = null;
    this.links = [];
    this.linksService.linksSub.next([]);
    this.linksService.setLinks([]);
    this.authService.logout();
    this.router.navigate(['/links']);
  }

  onSubmitSaveUser(user: User) {
    console.log(user);
    this.authService.saveChanges(user).subscribe({
        next: data => {
          const { userData } = data;
          if (userData.avatarFile) {
            this.avatarFile = `${this.authService.getAvatarSrc()}/${userData.avatarFile}`;
          }

          this.user = { ...userData, avatarFile: this.avatarFile };
          alert('The changes has been successfully saved');
        },
        error: err => {
          alert(err.error.errosMessages[0]);
        }
      })
  }

  onSubmitSaveLinks(links: Link[]) {
    this.linksService.saveChanges(links).subscribe({
      next: data => {
        this.links = data.links;
        this.linksService.linksSub.next(this.links);
        alert('The changes has been successfully saved');
      },
      error: err => {
        alert(err.error.errosMessages[0]);
      }
    })
  }
}
