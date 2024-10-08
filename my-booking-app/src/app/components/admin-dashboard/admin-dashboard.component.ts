import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { BreakpointService } from '../../../app/core/services/breakpoint.service';
import { UserAuthenticationService } from '../../../app/core/services/api/user-authentication.service';

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

  registerUser() {
    this.router.navigate(['register'], { queryParams: { isAdmin: true } });
  }
  
  manageUsers() {}

  logout() {
    this.userAuth.logoutUser();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['']);
  }



}
