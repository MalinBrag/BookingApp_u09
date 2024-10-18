import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { User } from '../../../shared/models/user.model';
import { AdminAuthenticationService } from '../../../core/services/api/admin-authentication.service';
import { Router, RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    MatProgressBarModule,
    RouterLink,
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {
  fields: string[] = ['role', 'name', 'email', 'phone', 'password'];
  isMobile: boolean = false;
  title = 'Manage Users';
  users: User[] = [];
  userToEdit: User | null = null;
  editUserId: string | null = null;
  
  /**
   * progress bar not active
   */
  /*isLoading: boolean = true;
  progress: number = 0;
  bufferProgress: number = 100;*/

  constructor(
    private adminAuth: AdminAuthenticationService,
  ) { }

  ngOnInit(): void {
  /* const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        this.isLoading = false;
        clearInterval(interval);
      }
    }, 500);*/

    this.loadUsers();
  }

  loadUsers() {
    this.adminAuth.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        //this.isLoading = false;
      },
      error: (error: any) => {
        window.alert('Error loading users');
        //this.isLoading = false;
      },
    });
  }



  
 








}
