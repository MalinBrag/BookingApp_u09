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
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.fetchUser(id);
    } else {
      window.alert('User not found');
    }
  }

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

  onDeleteUser() {
    if (this.user && this.user.id) {
      this.adminAuth.deleteUser(this.user.id).subscribe({
        next: (response: any) => {
          if (response.error) {
            window.alert(response.error);
          } else {
            this.router.navigate(['/manage']);
          }
        },
        error: (error: any) => {
          console.error(error);
        }
      })
    }
  }















}
