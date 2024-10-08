import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { User } from '../../../shared/interfaces/user.model';
import { AdminAuthenticationService } from '../../../core/services/api/admin-authentication.service';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserFormComponent } from '../../user-components/user-form/user-form.component';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    MatProgressBarModule,
    UserFormComponent,
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {
  fields: string[] = ['role', 'name', 'email', 'password'];
  isMobile: boolean = false;
  dropdownOpen: boolean = false;
  title = 'Manage Users';
  users: User[] = [];
  userToEdit: User | null = null;
  //progress bar
  isLoading: boolean = true;
  progress: number = 0;
  bufferProgress: number = 100;

  constructor(
    private adminAuth: AdminAuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        this.isLoading = false;
        clearInterval(interval);
      }
    }, 500);

    this.loadUsers();
  }

  loadUsers() {
    this.adminAuth.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        window.alert('Error loading users');
        this.isLoading = false;
      },
    });
  }

  toggleDropdown(user: User) {
    this.dropdownOpen = !this.dropdownOpen;
    this.openEdit(user);
  }

  openEdit(user: User) {
    this.userToEdit = user;
  }

  openDelete(user: User) {
    console.log('Delete user:', user);
  }

  onEditSubmit(updatedUser: User) {
    console.log('Edit user:', updatedUser);
    this.dropdownOpen = false;
    /*this.adminAuth.updateUser(updatedUser.id, updatedUser).subscribe({
      next: () => {
        this.loadUsers();
        this.userToEdit = null;
      },
      error: (error: any) => {
        console.log(error);
        window.alert('Error updating user');
      }
    });*/

  }

  
 








}
