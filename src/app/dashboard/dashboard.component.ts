import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
  ]
})
export class DashboardComponent {
  posts: FirebaseListObservable<any[]>;
  user: any;

  constructor(af: AngularFire, auth: AuthenticationService) {
    this.posts = af.database.list('/posts');
  }
}
