import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';
import { BreakpointService } from '../../../core/services/breakpoint.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    UserFormComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  fields: string[] = ['email', 'password'];
  isMobile: boolean = false;

  constructor(
    private router: Router,
    private userAuth: UserAuthenticationService,
    private breakpoint: BreakpointService,
  ) { }

  ngOnInit(): void {
    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

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
