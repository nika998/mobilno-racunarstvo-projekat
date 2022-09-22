import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService, private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onLogin(logInForm: NgForm) {
    this.isLoading = true;
    if (logInForm.valid) {
      this.authService.logIn(logInForm.value).subscribe(resData => {
        this.isLoading = false;
        logInForm.reset();
          this.router.navigateByUrl('/hospitals/tabs/explore');
        },
        errRes => {
          console.log(errRes);
          this.isLoading = false;
          let message = 'Incorrect email or password';

          const code = errRes.error.error.message;
          if (code === 'EMAIL_NOT_FOUND') {
            message = 'Email address could not be found.';
          } else if (code === 'INVALID_PASSWORD') {
            message = 'This password is not correct.';
          }

          this.alertCtrl.create({
            header: 'Authentication failed',
            message,
            buttons: ['Okay']
          }).then((alert) => {
            alert.present();
          });

          logInForm.reset();

        });
  }
}

    singUp(logInForm) {
      logInForm.reset();
      this.router.navigateByUrl('/register');
    }

}
