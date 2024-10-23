import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAuthenticationService } from '../../../core/services/api/admin-authentication.service';
import { FormUtils } from '../../../core/services/utilities/form-utils';
import { BreakpointService } from '../../../core/services/utilities/breakpoint.service';
import { EditUser, User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    UserFormComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  fields: string[] = ['role', 'name', 'email', 'phone', 'password'];
  user: User | null = null;
  isMobile: boolean = false;
  mode : string = 'edit';

  constructor(
    private router: Router,
    private adminAuth: AdminAuthenticationService,
    private breakpoint: BreakpointService,
    private formUtils: FormUtils,
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

    /**
     * Set the mode (title) of the form
     */
    this.formUtils.setMode(this.mode);

    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    })
  }

  /**
   * Display of selected user
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
   * Submitting the updated user data to the API and redirecting to the list once approved
   * @param event 
   */
  onSubmitEdit(event: EditUser) {
    const { userId, user } = event;
    this.adminAuth.updateUser(userId, user).subscribe(
      (response: User) => {
        if (response && 'error' in response) {
          window.alert(response.error);
        } else {
          this.router.navigate(['/manage']);
        }     
      }
    );
  }

}
