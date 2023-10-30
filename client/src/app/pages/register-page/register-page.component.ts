import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  formModel!: FormGroup;
  imageFile!: File;
  imagePreview: string | ArrayBuffer | null = '';

  constructor(private AuthService: AuthService,
              private router: Router) {

  }

  ngOnInit() {
    this.formModel = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      passwords: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        rPassword: new FormControl(null)
      }, [this.equalValidator]),
      firstName: new FormControl(null, [Validators.required]),
      secondName: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.email]),
      avatar: new FormControl(null)
    })
  }

  onSubmit() {
    if (this.formModel.valid) {
      const user: User = {
        login: this.formModel.value.login,
        password: this.formModel.value.passwords.password,
        firstName: this.formModel.value.firstName,
        secondName: this.formModel.value.secondName,
        email: this.formModel.value.email,
        avatarFile: this.imageFile
      }

      this.AuthService.register(user).subscribe({
        next: res => {
          alert('You have successfully registered');
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          alert(err.error.errorMessages[0]);
        }
      })
    }
  }

  onFileSelect(event: any) {
    const formats = ['image/png', 'image/jpeg', 'image/bmp'];
    const file = event.target.files[0];

    if (file) {
      if (formats.includes(file.type)) {
        this.imageFile = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        }

        reader.readAsDataURL(this.imageFile);
      }
      else {
        this.imagePreview = null;
        this.formModel.controls['avatar'].setErrors({ type: true });
      }
    }
  }

  equalValidator(control: AbstractControl): ValidationErrors | null {
    const { password, rPassword } = control.value;
    return password !== rPassword ? { equal: true } : null;
  }
}
