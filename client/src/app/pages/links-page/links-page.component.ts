import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LinksService} from "../../services/links.service";
import {Link} from "../../interfaces";
import {Observable, Subject, Subscription} from "rxjs";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent implements OnInit, OnDestroy {
  links: Link[] = [];
  form!: FormGroup;

  linksSub!: Subscription;

  constructor(private authService: AuthService,
              private linksService: LinksService) {
  }

  ngOnInit() {
    this.links = this.linksService.getLinks();

    this.linksSub = this.linksService.linksSub.subscribe(data => {
      this.links = data;

      this.form = new FormGroup({
        links: new FormArray(this.links.map(l => {
          return new FormGroup({
            platform: new FormControl(l.platform, Validators.required),
            link: new FormControl(l.link, Validators.required)
          })
        }))
      })
    });

    this.form = new FormGroup({
      links: new FormArray(this.links.map(l => {
        return new FormGroup({
          platform: new FormControl(l.platform, Validators.required),
          link: new FormControl(l.link, Validators.required)
        })
      }))
    })
  }

  ngOnDestroy() {
    this.linksSub.unsubscribe();
  }

  get linksFormItems() {
    return this.form.controls["links"] as FormArray;
  }

  addLinkFormItem() {
    if (this.authService.isAuthorized()) {
      this.linksFormItems.push(new FormGroup({
        platform: new FormControl('GitHub', Validators.required),
        link: new FormControl(null, Validators.required)
      }))
    } else {
      alert('You are not authorized');
    }
  }

  deleteLinkFormItem(index: number) {
    if (this.authService.isAuthorized()) {
      this.linksFormItems.removeAt(index);
    } else {
      alert('You are not authorized');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.linksService.onSaveLinks.next(this.form.value);
    }
  }
}
