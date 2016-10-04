import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing, appRoutingProviders } from './routing/app-routing.module';
import { AuthGuard } from './shared/authGuard.model';
import { AuthenticationService } from './shared/authentication.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD1DPEd6oT1ankG_4iFK-ax9gTOGiVlmag",
      authDomain: "honcho-cd19f.firebaseapp.com",
      databaseURL: "https://honcho-cd19f.firebaseio.com",
      storageBucket: "honcho-cd19f.appspot.com"
    }, {
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      }),
    routing
  ],
  providers: [
    appRoutingProviders,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
