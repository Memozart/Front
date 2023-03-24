import { Component } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseService } from 'src/app/services/response.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-card-page',
  templateUrl: './review-card-page.component.html',
  styleUrls: ['./review-card-page.component.css'],
})
export class ReviewCardPageComponent {
  value: number = 20;
  review!: any;
  reviewForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private response: ResponseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getReviewByTheme('640b15c689e35929e7675db2');

    this.reviewForm = this.fb.group({
      answer: ['', [Validators.required]],
      idReview: ['', [Validators.required]],
    });
  }

  getReviewByTheme = (theme_id: any) => {
    this.http.get('reviews/' + theme_id).subscribe({
      next: (res: any) => {
        this.review = res.body.review;
        console.log(this.review);
      },
    });
  };

  submitReview() {
    this.reviewForm.controls['idReview'].setValue(this.review._id);
    const answerData = this.reviewForm.value;
    console.log(answerData);

    if (this.reviewForm.invalid) return;

    this.http.post('reviews', answerData).subscribe({
      next: (res: any) => {
        console.log(res);
        // display modal response
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur');
      },
    });
  }
}
