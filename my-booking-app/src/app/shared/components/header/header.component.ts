import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgClass } from '@angular/common';
import { BreakpointService } from './../../../core/services/breakpoint.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../../components/user-components/register/register.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgClass,
    RouterLink,
    RegisterComponent,
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
    this.dialog.open(RegisterComponent, {
      fields: ['name', 'email', 'password', 'password_confirmation'],
    });
    this.dropdownOpen = false;
  }



}
