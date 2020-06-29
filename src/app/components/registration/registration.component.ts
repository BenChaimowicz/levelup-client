import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'src/app/interfaces/user.interface';
import { MatchPasswords } from 'src/app/validators/mustmatch.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  today = moment().format('YYYY-MM-DD');

  registrationForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]*')]),
    dateOfBirth: new FormControl(moment().subtract(18, 'years').format('YYYY-MM-DD'), []),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.minLength(6)]),
      passwordVerify: new FormControl('')
    }, [Validators.required, MatchPasswords])
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onDone() {
    try {
      const { passwords, ...newUser } = this.registrationForm.value;
      newUser.password = this.registrationForm.get('passwords').get('password').value;
      newUser.dateOfBirth = moment(newUser.dateOfBirth).toDate();
    } catch (err) {
      console.error(err);
    }
  }
}
