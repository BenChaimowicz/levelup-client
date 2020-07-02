import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'src/app/interfaces/user.interface';
import { MatchPasswords } from 'src/app/validators/mustmatch.validator';
import { MinimumAge } from 'src/app/validators/minage.validator';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take, catchError } from 'rxjs/operators';

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
    dateOfBirth: new FormControl(moment().subtract(18, 'years').format('YYYY-MM-DD'), [MinimumAge]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.minLength(6)]),
      passwordVerify: new FormControl('')
    }, [Validators.required, MatchPasswords])
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onDone() {
    try {
      const { passwords, ...newUser } = this.registrationForm.value;
      newUser.password = this.registrationForm.get('passwords').get('password').value;
      newUser.dateOfBirth = moment(newUser.dateOfBirth).toDate();
      this.registerUser(newUser);
    } catch (err) {
      console.error(err);
    }
  }

  private registerUser(user: User) {
    this.userService.register(user).pipe(take(1), catchError(err => {
      console.error(err);
      return err;
    })).subscribe(u => {
      if (u) {
        this.router.navigate(['./']);
        return u;
      } else {
        console.error('Could not create user');
      }
    });
  }
}
