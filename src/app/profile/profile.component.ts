import { Component, OnInit } from '@angular/core';

import { User } from '../shared/user.model';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private profileUser: User;

  constructor(private _auth: AuthenticationService) {
    _auth.getUser()
      .subscribe(user => {
        this.profileUser = user;
      });
  }

  providerSignin(authId: number) {
    console.log(authId);
    this._auth.signIn(authId)
      .then(user => {
        console.log(user);
      });;
  }

  ngOnInit() {
  }

}
