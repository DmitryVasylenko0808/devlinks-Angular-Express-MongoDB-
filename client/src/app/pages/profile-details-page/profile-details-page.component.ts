import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../interfaces";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-profile-details-page',
  templateUrl: './profile-details-page.component.html',
  styleUrls: ['./profile-details-page.component.scss']
})
export class ProfileDetailsPageComponent implements OnInit, OnDestroy {
  avatarFile: File | string = 'assets/avatar.jpg';
  imagePreview: string | ArrayBuffer | null = 'assets/avatar.jpg';
  formModel!: FormGroup;
  user: User | null = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();

    if (this.user?.avatarFile) {
      this.avatarFile = `${this.authService.getAvatarSrc()}/${this.user.avatarFile}`;
      this.imagePreview = `${this.authService.getAvatarSrc()}/${this.user.avatarFile}`;
    }

    this.formModel = new FormGroup({
      avatar: new FormControl(null),
      firstName: new FormControl(this.user?.firstName, Validators.required),
      secondName: new FormControl(this.user?.secondName, Validators.required),
      email: new FormControl(this.user?.email, Validators.email)
    });
  }

  ngOnDestroy() {
  }

  onFileSelect(event: any) {
    const formats = ['image/png', 'image/jpeg', 'image/bmp'];
    const file = event.target.files[0];

    if (file) {
      if (formats.includes(file.type)) {
        this.avatarFile = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        }

        if (this.avatarFile instanceof File) {
          reader.readAsDataURL(this.avatarFile);
        }
      } else {
        this.formModel.controls['avatar'].setErrors({ type: true });
      }
    }
  }

  onSubmit() {
    if (!this.checkUserChanges() && this.formModel.valid) {
      this.user = {
        ...this.formModel.value,
        avatarFile: this.avatarFile
      };

      this.authService.onSaveUser.next(this.user);
    }
  }

  checkUserChanges(): boolean {
    if (this.user?.firstName !== this.formModel.value.firstName || this.user?.secondName !== this.formModel.value.secondName
      || this.user?.email !== this.formModel.value.email || this.user?.avatarFile !== this.avatarFile) {
      return false;
    }
    return true;
  }
}
