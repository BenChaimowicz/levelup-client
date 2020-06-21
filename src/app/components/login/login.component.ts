import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    this.isOpen = true;
  }
  close() {
    this.isOpen = false;
  }
}
