import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthenticationService, private _router: Router) { }

  canActivate(): Observable<boolean> {
    return this._auth.getUser()
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState)
      .do(authenticated => {
        if (!authenticated) this._router.navigate(['login']);
      });
  }
}