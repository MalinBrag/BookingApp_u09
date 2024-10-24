import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { BreakpointService } from '../../../core/services/utilities/breakpoint.service';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  title = 'Dashboard';
  isMobile: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private breakpoint: BreakpointService,
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
   * Redirect admin to register page with admin flag, to be able to create new admin
   */
  registerUser() {
    this.router.navigate(['register'], { queryParams: { isAdmin: true } });
  }
  
  /**
   * Redirect admin to manage users page
   */
  manageUsers() {
    this.router.navigate(['manage']);
  }

  /**
   * Logout
   */
  logout() {
    this.userAuth.logoutUser();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['']);
  }



}
