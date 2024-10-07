import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    UserFormComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fields: string[] = ['name', 'email', 'password', 'password_confirmation'];

  constructor(
    private router: Router,
    private userAuth: UserAuthenticationService,
  ) { }

  onSubmitRegister(data: any) {
    console.log(data);
    this.userAuth.registerUser(data).subscribe(
      (response: any) => {
        if (response.error) {
          window.alert(response.error);
        } else {
          this.router.navigate(['']);
        }     
      });
  }
  

}
