import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  formModel!: FormGroup;

  constructor(private AuthService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.formModel = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    if (this.formModel.valid) {
      const { login, password } = this.formModel.value;
      this.AuthService.login(login, password).subscribe({
        next: (res) => { this.router.navigate(['/links']); },
        error: (err) => { alert(err.error.errorMessages[0]); }
      })
    }
  }
}
