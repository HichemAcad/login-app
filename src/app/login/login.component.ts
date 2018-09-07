import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validInfos: Boolean = true;
  canSubmit: Boolean = true;

  constructor (private authService: AuthService, private router: Router) {}

  onSubmit(form: FormControl) {
    if (form.valid) {
      this.validInfos = true;
      this.canSubmit = false;
      this.authService.logIn(form.value).subscribe(res => {
        if (res) {
          this.router.navigate(['/']);
        } else {
          this.validInfos = false;
          this.canSubmit = true;
        }
      });
    }
  }
}
