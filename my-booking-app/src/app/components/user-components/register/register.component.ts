import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service'; 
import { FormUtils } from '../../../core/services/utilities/form-utils';
import { CommonModule, NgIf } from '@angular/common';
import { BreakpointService } from '../../../core/services/utilities/breakpoint.service';
import { RegisterUser, LoginResponse } from '../../../shared/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    UserFormComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  fields: string[] = ['name', 'email', 'phone', 'password', 'password_confirmation'];
  mode : string = 'register';
  isMobile: boolean = false;

  constructor(
    private router: Router,
    private userAuth: UserAuthenticationService,
    private route: ActivatedRoute,
    private formUtils: FormUtils,
    private breakpoint: BreakpointService,
  ) { }

  /**
   * Load of page
   */
  ngOnInit(): void {
    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    /**
     * Set the mode (title) of the form
     */
    this.formUtils.setMode(this.mode);

    this.route.queryParams.subscribe(params => {
      if (params['isAdmin']) {
        this.fields.push('role');
      }
    });
  }

  /**
   * Submitting the form data to the API and waiting for response
   * @param data 
   */
  onSubmitRegister(data: RegisterUser): void {
    this.userAuth.registerUser(data).subscribe(
      (response: LoginResponse) => {
        if (response && 'error' in response) {
          window.alert(response.error);
        } else {
          this.router.navigate(['']);
        }     
      });
  }
  

}
