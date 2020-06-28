import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser$: Observable<User>;
  isOpen = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.currentUser$ = this.loginService.currentUser$;
  }

  open() {
    this.isOpen = true;
  }
  close() {
    this.isOpen = false;
  }
}
