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
  authMethods = [];

  constructor(private _auth: AuthenticationService, private _router: Router) {
    this.authMethods = _auth.getProviders();
  }

  ngOnInit() {
  }

  signIn(user: User) {
    //this.auth.login(user);
  }

  providerSignin(provider: any) {
    let authId: number = this._auth.getProviderID(provider.providerId);
    console.log(provider, authId);
    this._auth.signIn(authId)
      .then(user => {
        console.log(user);
        this._router.navigate(['']);
      });;
  }

}
