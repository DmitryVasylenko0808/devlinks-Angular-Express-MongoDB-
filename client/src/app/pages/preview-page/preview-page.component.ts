import {Component, OnInit} from '@angular/core';
import {Link, User} from "../../interfaces";
import {AuthService} from "../../services/auth.service";
import {LinksService} from "../../services/links.service";

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss']
})
export class PreviewPageComponent implements OnInit {
  avatarFile: string = '';
  user: User | null = null;
  links: Link[] = [];
  constructor(private authService: AuthService,
              private linkService: LinksService) {
  }

  ngOnInit() {
    this.authService.fetchUser().subscribe({
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

        console.log(this.user);
      },
      error: err => {
        this.user = {
          firstName: '',
          secondName: '',
          email: '',
          avatarFile: ''
        }
      }
    });

    this.linkService.fetchAll().subscribe({
      next: data => {
        this.links = [...data.links];
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
