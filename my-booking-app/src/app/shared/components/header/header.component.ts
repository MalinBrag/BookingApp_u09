import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgClass } from '@angular/common';
import { BreakpointService } from './../../../core/services/breakpoint.service';
import { DialogFrameService } from '../../../core/services/dialogframe.service';
import { RegisterComponent } from '../../../components/user-components/register/register.component';
import { SignInComponent } from '../../../components/user-components/sign-in/sign-in.component';
import { LogoutComponent } from '../../../components/user-components/logout/logout.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgClass,
    RouterLink,
    //RegisterComponent,
    SignInComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'My Booking App';
  isMobile: boolean = false;
  isLoggedIn: boolean = false;
  dropdownOpen: boolean = false;
  

  constructor(
    private breakpoint: BreakpointService,
    private router: Router,
    private dialog: DialogFrameService,
  ) { }

  ngOnInit(): void {
    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  registerUser() {
    this.dialog.openDialogFrame(RegisterComponent, {
      fields: ['name', 'email', 'password', 'password_confirmation'],
    });
    this.dropdownOpen = false;
  }

  signInUser() {
    this.dialog.openDialogFrame(SignInComponent, {
      width: '300px',
      position: { top: '50px', right: '10px' },
      //fields: ['email', 'password'],
    });
    this.dropdownOpen = false;
  }

  logoutUser() {
    this.router.navigate(['logout']);
    this.dropdownOpen = false;
  }


}
