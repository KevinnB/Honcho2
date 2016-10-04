import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'app works!';
  user: any;

  ngOnInit() {
  }

  constructor(private _auth: AuthenticationService) {
    _auth.getUser()
      .subscribe(user => {
        this.user = user;
      });
  }

  signOut() {
    this._auth.signOut()
  }
}
