import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { User } from '../../../shared/models/user.model';
import { AdminAuthenticationService } from '../../../core/services/api/admin-authentication.service';
import { RouterLink } from '@angular/router';
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

  constructor(
    private adminAuth: AdminAuthenticationService,
  ) { }

  /**
   * Load of page
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Load all users
   */
  loadUsers() {
    this.adminAuth.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error) => {
        window.alert('Error loading users: ' + error);
      },
    });
  }



  
 








}
