import { Component, OnDestroy } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseService } from 'src/app/services/response.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignService } from 'src/app/services/design.service';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-review-card-page',
  templateUrl: './review-card-page.component.html',
  styleUrls: ['./review-card-page.component.css'],
})
export class ReviewCardPageComponent implements OnDestroy {
  theme_id: any;
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
    private router: Router,
    private route: ActivatedRoute,
    private designService: DesignService,
    private metaService: Meta,
    private titleService: Title
  ) { }

  ngOnDestroy() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:keywords'");

    this.designService.resetCustomBgColor();
  }
  ngOnInit() {
    const ogtitle: MetaDefinition = { name: 'title', property: 'og:title', content: 'Memozart - Révise et progresse - Optimise ton apprentissage' };
    const ogkeywords: MetaDefinition = { name: 'keywords', property: 'og:keywords', content: 'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,revision,apprentissage,mémorisation,répétition,apprentissage espacé,home,accueil,entreprise,carte' };
    const ogdesc: MetaDefinition = {
      name: 'description', property: 'og:description', content: 'Révise et progresse grâce à l\'efficacité de l\'apprentissage espacé sur Memozart. Utilise notre outil convivial pour affiner tes connaissances et atteindre tes objectifs d\'apprentissage. Découvre une nouvelle façon de maîtriser de nouveaux sujets sur Memozart !'
    };

    if (ogtitle.content) this.titleService.setTitle(ogtitle.content);
    this.metaService.addTag(ogtitle);
    this.metaService.addTag(ogkeywords);
    this.metaService.addTag(ogdesc);

    this.getParamsOrRedirect();

    this.reviewForm = this.fb.group({
      answer: ['', [Validators.required]],
      idReview: ['', [Validators.required]],
    });
    this.designService.changeCustomBgColor('white');
  }

  getParamsOrRedirect() {
    this.route.queryParams.subscribe((params) => {
      this.theme_id = params['theme'];
    });

    if (!this.theme_id) {
      this.router.navigate(['./']);
    } else {
      this.getReviewByTheme(this.theme_id);
    }
  }

  getReviewByTheme = (theme_id: any) => {
    this.http.get('reviews/' + theme_id).subscribe({
      next: (res: any) => {
        if (!res.body) {
          this.router.navigate(['./']);
        }

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
        this.designService.changeCustomBgColor(this.bgLinearGradient);
      },
      error: () => {
        this.router.navigate(['./']);
      },
    });
  };

  showDialog(show: boolean) {
    this.visible = show;
  }

  refreshPage() {
    this.review = false;
    this.getReviewByTheme(this.theme_id);
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
          this.designService.changeCustomBgColor('#03a55a');
          this.borderLinearGradient = '#03a55a';
          this.bgLinearGradient = '#03a55a';
        } else {
          this.feedBackTitle = 'Oh noooon !';
          this.designService.changeCustomBgColor('#dc3055');
          this.borderLinearGradient = '#dc3055';
          this.bgLinearGradient = '#dc3055';
        }

        this.showDialog(true);
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur');
      },
    });
  }
}
