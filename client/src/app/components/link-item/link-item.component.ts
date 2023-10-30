import {Component, Input} from '@angular/core';
import {Link} from "../../interfaces";

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss']
})
export class LinkItemComponent {
  @Input() link: Link | null = null;

  constructor() {
  }
}
