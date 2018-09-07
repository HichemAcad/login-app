import { environment } from './../environments/environment';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdminActive = false;
  backgroundColor = environment.navBackgroundColor;

  constructor (public authService: AuthService) {}

  onSubmit(form: FormControl) {
    console.log(form.value, form);
  }

  logOut() {
    this.authService.logOut();
  }

}
