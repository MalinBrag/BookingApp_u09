import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgClass } from '@angular/common';
import { BreakpointService } from '../../../core/services/utilities/breakpoint.service';
import { DialogFrameService } from '../../../core/services/utilities/dialogframe.service';
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

  /**
   * Load of page
   */
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

  /**
   * Toggle dropdown menu
   */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  /**
   * Menu item register, redicreting to register page or providing register fields to modal view
   */
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

  /**
   * Menu item sign-in, redicreting to sign-in page or providing sign-in fields to modal view
   */
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

  /**
   * Menu item logout, logging out user and redirecting to home page
   */
  logoutUser() {
    this.userAuth.logoutUser();
    this.isLoggedIn = false;
    this.dropdownOpen = false;
    this.router.navigate(['']);
  }

  /**
   * Menu item my pages, redirecting to profile page if user is logged in
   */
  getMyPages() {
    if (this.isLoggedIn) {
      this.userAuth.getProfile().subscribe({
        next: () => {
          this.router.navigate(['/profile']);
          this.dropdownOpen = false;
        },
        error: () => {
          window.alert('Error getting profile');
        }
      });
    } else {
      this.router.navigate(['/sign-in']);
      this.dropdownOpen = false;
    }
  }

  /**
   * Menu item admin dashboard, redirecting to admin dashboard if user is admin
   */
  getAdminDashboard() {
    if (this.isAdmin) {
      this.router.navigate(['/dashboard']);
      this.dropdownOpen = false;
    } else {
      window.alert('You are not an admin');
    }
  }


}
