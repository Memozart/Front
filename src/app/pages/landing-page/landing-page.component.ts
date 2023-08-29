import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/services/http.service';
import { Theme } from 'src/app/models/theme';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  bucketLandingPage = environment.bucketAdresse + 'landing_page/';
  themes!: Theme[];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.get('themes').subscribe({
      next: (data: any) => {
        this.themes = data.body as Theme[];
      },
    });

  }
}
