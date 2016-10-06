import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';
import { AngularFire, AuthMethods, AuthProviders, FirebaseAuthState } from 'angularfire2';


@Injectable()
export class AuthenticationService {
  private authUser: User = null;
  private state: FirebaseAuthState = null;

  constructor(
    public _af: AngularFire,
    private _router: Router) {
  }

  setUser(state: FirebaseAuthState) {
    this.state = state;
    return this.authUser = new User(state.auth.uid, state.auth.email, state.auth.emailVerified, state.auth.isAnonymous, state.auth.providerData);
  }

  getProvider(provider: number) {
    switch (provider) {
      case 1:
        return new firebase.auth.TwitterAuthProvider();
      case 2:
        return new firebase.auth.FacebookAuthProvider();
      case 3:
        return new firebase.auth.GoogleAuthProvider();
    }
  }

  getProviderID(provider: string) {
    switch (provider) {
      case "twitter.com":
        return 1
      case "facebook.com":
        return 2
      case "google.com":
        return 3
    }
  }

  getProviders() {
    return [
      new firebase.auth.GoogleAuthProvider(),
      new firebase.auth.FacebookAuthProvider(),
      new firebase.auth.TwitterAuthProvider()
    ]
  }

  getUser(): Observable<User> {
    return this._af.auth
      .map((state: FirebaseAuthState) => {
        if (state) {
          console.log("Loaded new user", state, this.setUser(state));
          return this.setUser(state);
        } else {
          return null;
        }
      });
  }

  linkAccount(provider: number): firebase.Promise<FirebaseAuthState> {
    let nProvider = this.getProvider(provider);

    return this.state.auth.linkWithPopup(nProvider)
      .then(state => {
        if (state) {
          console.log("Linked", provider, state, this.authUser);
          return true;
        } else {
          return false;
        }
      });
  }

  unLinkAccount(provider: string): firebase.Promise<FirebaseAuthState> {
    console.log(this.state.auth, this.authUser);

    return this.state.auth.unlink(provider)
      .then(state => {
        if (state) {
          console.log("Unlinked", provider, state, this.authUser);
          return true;
        } else {
          return false;
        }
      });
  }

  signIn(provider: number): firebase.Promise<FirebaseAuthState> {
    return this._af.auth.login({ provider })
      .then(user => {
        console.log(user);
        if (user) {
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

  linkWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Google);
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

