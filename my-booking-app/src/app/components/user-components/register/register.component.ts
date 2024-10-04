import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    UserFormComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(private router: Router) { }

  onSubmit() {
    if (UserFormComponent.form.valid) {
      console.log('Form Submitted!');
      this.router.navigate(['/login']);
    }
  }

}
