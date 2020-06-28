import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  today: string;

  registrationForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl(),
    passwords: new FormGroup({
      password: new FormControl(''),
      passwordVerify: new FormControl('')
    }, [Validators.required])
  });

  constructor() {
    console.log(this.today);
  }

  ngOnInit(): void {
  }

  onDone() {
    console.log(this.registrationForm.get('dateOfBirth').value);
  }
}
