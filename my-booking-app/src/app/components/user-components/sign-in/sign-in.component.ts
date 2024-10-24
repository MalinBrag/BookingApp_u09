import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';
import { BreakpointService } from '../../../core/services/utilities/breakpoint.service';
import { FormUtils } from '../../../core/services/utilities/form-utils';
import { LoginUser, LoginResponse } from '../../../shared/models/user.model';

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
  mode : string = 'sign-in';

  constructor(
    private router: Router,
    private userAuth: UserAuthenticationService,
    private breakpoint: BreakpointService,
    private formUtils: FormUtils,
  ) { }

  /**
   * Load of page
   */
  ngOnInit(): void {
    /**
     * Set the mode (title) of the form
     */
    this.formUtils.setMode(this.mode);

    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    })
  }

  /**
   * Sumitting the form data to the API and waiting for response
   * @param data 
   */
  onSubmitSignIn(data: LoginUser) {
    this.userAuth.signInUser(data).subscribe(
      (response: LoginResponse) => {
        if (response && 'error' in response) {
          window.alert(response.error);
        } else {
          this.router.navigate(['']);
        }     
      });
  }

}
