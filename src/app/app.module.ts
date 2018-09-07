import { LoginGuard } from './helpers/login.guard.service';
import { ApiHttpInspector } from './helpers/http.inspector';
import { AdminGuard } from './helpers/admin.guard.service';
import { AuthService } from './services/auth.service';
import { SlidesService } from './services/slides.service';
import { AppRouter } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http/';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NoSpaceDirective } from './directives/nospace.directive';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { ErrorsComponent } from './errors/errors.component';
import { LoginComponent } from './login/login.component';

export function getToken () {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NoSpaceDirective,
    AdminComponent,
    HomeComponent,
    ErrorsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouter,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    })
  ],
  providers: [
    AuthService,
    AdminGuard,
    LoginGuard,
    JwtHelperService,
    SlidesService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiHttpInspector, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
