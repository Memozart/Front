import { Component } from '@angular/core';
import { DesignService } from 'src/app/services/design.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  themes!: any;

  constructor(private http: HttpService, public designService: DesignService) {}

  ngOnInit() {
    this.getAllThemes();
  }

  getAllThemes() {
    this.http.get('stats/reviews-of-all-themes').subscribe({
      next: (res: any) => {
        this.themes = res.body;
      },
    });
  }
}
