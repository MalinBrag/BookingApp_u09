import { Component } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  subtitle = 'Welcome to My Booking App';

}
