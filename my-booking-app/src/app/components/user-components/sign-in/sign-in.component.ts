import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    UserFormComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  fields: string[] = ['email', 'password'];

  constructor(
    private router: Router,
    private userAuth: UserAuthenticationService,
  ) { }

  onSubmitSignIn(data: any) {
    console.log(data);
    this.userAuth.signInUser(data)/*.subscribe(
      (response: any) => {
        if (response.error) {
          window.alert(response.error);
        } else {
          this.router.navigate(['']);
        }     
      });*/
  }

}
