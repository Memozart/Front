import { Component } from '@angular/core';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-review-card-page',
  templateUrl: './review-card-page.component.html',
  styleUrls: ['./review-card-page.component.css'],
})
export class ReviewCardPageComponent {
  value: number = 20;
  review!: any;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.get('reviews/640b15c689e35929e7675db2').subscribe({
      next: (res: any) => {
        this.review = res.body.review;
        console.log(this.review);
      },
    });
  }
}
