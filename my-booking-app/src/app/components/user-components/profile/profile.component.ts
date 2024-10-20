import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BreakpointService } from '../../../core/services/utilities/breakpoint.service';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  title = 'My Pages';
  isMobile: boolean = false;
  isLoggedIn: boolean = false;
  
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
  }

  logout() {
    this.userAuth.logoutUser();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }



}
