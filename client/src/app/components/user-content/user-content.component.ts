import {Component, Input, OnInit} from '@angular/core';
import {Link, User} from "../../interfaces";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {
  @Input() variant: string = '';
  @Input() user: User | null = null;
  @Input() links: Link[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }
}
