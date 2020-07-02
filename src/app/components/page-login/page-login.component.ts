import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Observable, EMPTY } from 'rxjs';
import { LoginInfo } from 'src/app/interfaces/login.interface';
import { catchError, first } from 'rxjs/operators';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  login$: Observable<LoginInfo>;
  loading = false;
  wrong = false;

  loginForm: FormGroup = new FormGroup({
    emailOrUsername: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSignIn() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { emailOrUsername, password } = this.loginForm.value;
      this.login$ = this.loginService.login(emailOrUsername, password)
        .pipe(catchError(err => {
          console.error(err);
          this.wrong = true;
          this.loading = false;
          return EMPTY;
        }), first());
    }

  }
}
