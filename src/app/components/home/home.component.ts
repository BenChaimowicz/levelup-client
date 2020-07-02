import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser$: Observable<User>;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.currentUser$ = this.loginService.currentUser$;
  }

}
