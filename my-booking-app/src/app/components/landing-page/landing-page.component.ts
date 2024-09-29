import { Component } from '@angular/core';
import { SearchFormComponent } from '../../shared/components/search-form/search-form.component'; 

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    SearchFormComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  subtitle = 'Welcome to My Booking App';

}
