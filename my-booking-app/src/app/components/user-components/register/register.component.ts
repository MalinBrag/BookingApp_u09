import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service'; 
import { FormService } from '../../../core/services/form.service';
import { CommonModule, NgIf } from '@angular/common';
import { BreakpointService } from '../../../core/services/breakpoint.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    UserFormComponent,
    CommonModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  fields: string[] = ['name', 'email', 'password', 'password_confirmation'];
  mode : string = 'register';
  isMobile: boolean = false;

  constructor(
    private router: Router,
    private userAuth: UserAuthenticationService,
    private route: ActivatedRoute,
    private formService: FormService,
    private breakpoint: BreakpointService,
  ) { }

  ngOnInit(): void {
    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.formService.setMode(this.mode);
    this.route.queryParams.subscribe(params => {
      if (params['isAdmin']) {
        this.fields.push('role');
      }
    });
  }

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
