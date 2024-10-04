import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../../core/services/api/user-authentication.service';
import { DialogFrameService } from '../../../core/services/dialogframe.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(
    private router: Router,
    private userAuth: UserAuthenticationService,
    private dialog: DialogFrameService,
  ) {}

  logoutUser() {
    this.userAuth.logoutUser();
    this.dialog.openLogoutDialog().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }




}
