import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProviders } from 'angularfire2';

import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private _auth: AuthenticationService, private _router: Router) { }

  ngOnInit() {
    console.log(this._auth, this._auth.getUser());
  }

  signIn(user: User) {
    //this.auth.login(user);
  }

  providerSignin(authId: number) {
    console.log(authId);
    this._auth.signIn(authId)
      .then(user => {
        console.log(user);
        this._router.navigate(['']);
      });;
  }

}
