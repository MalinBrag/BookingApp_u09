import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule, NgIf, NgClass } from '@angular/common';
import { BreakpointService } from './../../../core/services/breakpoint.service';
import { DialogFrameService } from '../../../core/services/dialogframe.service';
import { RegisterComponent } from '../../../components/user-components/register/register.component';
import { SignInComponent } from '../../../components/user-components/sign-in/sign-in.component';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgClass,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'My Booking App';
  isMobile: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  dropdownOpen: boolean = false;
  

  constructor(
    private breakpoint: BreakpointService,
    private router: Router,
    private dialog: DialogFrameService,
    private userAuth: UserAuthenticationService,
  ) { }

  ngOnInit(): void {
    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.userAuth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    
    this.userAuth.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  registerUser() {
    if (this.isMobile) {
      this.dialog.openDialogFrame(RegisterComponent, {
        fields: ['name', 'email', 'phone', 'password', 'password_confirmation'],
      });
      this.dropdownOpen = false;
    } else {
      this.router.navigate(['/register']);
    }
  }

  signInUser() {
    if (this.isMobile) {
      this.dialog.openDialogFrame(SignInComponent, {
        fields: ['email', 'password'],
      });
      this.dropdownOpen = false;
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  logoutUser() {
    this.userAuth.logoutUser();
    this.isLoggedIn = false;
    this.dropdownOpen = false;
    this.router.navigate(['']);
  }

  getMyPages() {
    if (this.isLoggedIn) {
      this.userAuth.getProfile().subscribe({
        next: (response: any) => {
          this.router.navigate(['/profile']);
          this.dropdownOpen = false;
        },
        error: (error: any) => {
          window.alert('Error getting profile');
        }
      });
    } else {
      this.router.navigate(['/sign-in']);
      this.dropdownOpen = false;
    }
  }

  getAdminDashboard() {
    if (this.isAdmin) {
      this.router.navigate(['/dashboard']);
      this.dropdownOpen = false;
    } else {
      window.alert('You are not an admin');
    }
  }


}
