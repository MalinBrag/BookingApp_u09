import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AdminAuthenticationService } from '../../../core/services/api/admin-authentication.service';
import { User } from '../../../shared/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent implements OnInit {
  user: User | null = null;

  constructor(
    private router: Router,
    private adminAuth: AdminAuthenticationService,
    private route: ActivatedRoute,
  ) { }
  
  /**
   * Load of page
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.fetchUser(id);
    } else {
      window.alert('User not found');
    }
  }

  /**
   * Display the selectd user
   * @param userId 
   */
  fetchUser(userId: string) { 
    this.adminAuth.getUser(userId).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  /**
   * Delete the selected user and redirect to list
   */
  onDeleteUser() {
    if (this.user && this.user.id) {
      this.adminAuth.deleteUser(this.user.id).subscribe({
        next: (response: string) => { 
          if (!response) {
            window.alert('An error occurred while deleting user');
          } else {
            window.alert('User successfully deleted');
            this.router.navigate(['/manage']);
          }
        },
        error: (error) => {
          window.alert('An error occurred while deleting user');
          console.error(error);
        }
      })
    }
  }















}
