import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';
import { AngularFire, AuthMethods, AuthProviders, FirebaseAuthState } from 'angularfire2';


@Injectable()
export class AuthenticationService {
  private authUser: User = null;

  constructor(
    public _af: AngularFire,
    private _router: Router) {

    _af.auth.subscribe((state: FirebaseAuthState) => {
      this.setUser(state);
    });
  }

  setUser(state: FirebaseAuthState) {
    return this.authUser = new User(state.auth.uid, state.auth.email, state.auth.emailVerified, state.auth.isAnonymous, state.auth.providerData);
  }

  getUser(): Observable<User> {
    if (this.authUser) {
      return Observable.of(this.authUser);
    } else {
      return this._af.auth
        .map((state: FirebaseAuthState) => {
          return this.setUser(state);
        });
    }
  }

  signIn(provider: number): firebase.Promise<FirebaseAuthState> {
    return this._af.auth.login({ provider })
      .then(user => {
        console.log(user);
        if (user) {
          this.setUser(user);
          return true;
        } else {
          this.setUser(null);
          return false;
        }
      })
      .catch(error => {
        console.log('ERROR @ AuthService#signIn() :', error)
      });
  }

  signInWithGithub(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Github);
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Google);
  }

  signInWithTwitter(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Twitter);
  }

  signInWithPassword(username: string, password: string): firebase.Promise<FirebaseAuthState> {
    console.log(username);
    return this._af.auth.login({ 'email': username, 'password': password }, {
      method: AuthMethods.Password,
      provider: AuthProviders.Password
    });
  }

  signOut(): void {
    this._af.auth.logout();
    this._router.navigate(['login']);
  }

}

