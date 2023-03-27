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
  review!: any;
  reviewForm!: FormGroup;
  visible!: boolean;
  modalStyle!: string;
  btnModalStyle!: string;
  reviewFeedBack: any;
  feedBackTitle!: string;
  borderLinearGradient!: string;
  bgLinearGradient!: string;

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
        this.borderLinearGradient =
          'linear-gradient(var(--dark-bg-color), var(--dark-bg-color)) padding-box, linear-gradient(to bottom, ' +
          this.review.theme.color1 +
          ', ' +
          this.review.theme.color2 +
          ') border-box';

        this.bgLinearGradient =
          'linear-gradient(' +
          this.review.theme.color1 +
          ', ' +
          this.review.theme.color2 +
          ')';

        console.log(this.review);
      },
    });
  };

  showDialog(show: boolean) {
    this.visible = show;
  }

  refreshPage() {
    this.review = false;
    this.getReviewByTheme('640b15c689e35929e7675db2');
    this.showDialog(false);
    this.reviewForm.reset();
  }

  submitReview() {
    this.reviewForm.controls['idReview'].setValue(this.review._id);
    const answerData = this.reviewForm.value;

    if (this.reviewForm.invalid) return;

    this.http.post('reviews', answerData).subscribe({
      next: (res: any) => {
        this.reviewFeedBack = res.body.statusResponse;

        this.modalStyle = 'bg-' + this.reviewFeedBack.success;
        this.btnModalStyle = 'btn-modal-' + this.reviewFeedBack.success;

        if (this.reviewFeedBack.success) {
          this.feedBackTitle = 'Yhaaaaa !';
        } else {
          this.feedBackTitle = 'Oh noooon !';
        }

        this.showDialog(true);
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur');
      },
    });
  }
}
