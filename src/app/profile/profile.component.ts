import { Component, OnInit } from '@angular/core';

import { User } from '../shared/user.model';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileUser: User;
  authMethods = [];

  constructor(private _auth: AuthenticationService) {
    this.authMethods = _auth.getProviders();

    _auth.getUser()
      .subscribe(user => {
        this.profileUser = user;
        console.log("User Subscription updated", user);
      });
  }

  setClasses(provider) {
    let classes;

    if (this.providerAttached(provider.providerId)) {
      classes = {
        'card-success': true,
        'card-inverse': true
      }
    }
    return classes;
  }



  providerAttached(providerId: string) {
    if (this.profileUser && this.profileUser.platforms) {
      for (var i = 0; i < this.profileUser.platforms.length; i++) {
        if (this.profileUser.platforms[i].providerId === providerId) {
          return true;
        }
      }
    }
    return false;
  }

  toggleProviderLink(provider: any) {
    let providerId = provider.providerId;

    if (this.providerAttached(providerId)) {
      this._auth.unLinkAccount(providerId);
    } else {
      let authId = this._auth.getProviderID(providerId);
      this._auth.linkAccount(authId);
    }
  }

  ngOnInit() {
  }

}
