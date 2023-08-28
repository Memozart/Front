import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Theme } from 'src/app/models/theme';
import { DesignService } from 'src/app/services/design.service';
import { Meta,MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-create-card-page',
  templateUrl: './create-card-page.component.html',
  styleUrls: ['./create-card-page.component.css'],
})
export class CreateCardPageComponent {
  themes!: Theme[];
  theme!: Theme;
  selectedTheme!: any;
  bgLinearGradient!: string;
  createCardForm!: FormGroup;
  dateMini = new Date();
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router,
    private response: ResponseService,
    public designService: DesignService,
    private metaService:Meta
  ) {}

  ngOnDestroy() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:keywords'");

    this.designService.resetCustomBgColor();
  }

  ngOnInit() {
    const ogtitle: MetaDefinition =  { name: 'title',property: 'og:title', content: 'Creation - Creer vos propres cartes de revisions'};
    const ogkeywords: MetaDefinition = {name: 'keywords',property: 'og:keywords', content:'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,apprentissage,mémorisation,répétition,apprentissage espacé,'};
    const ogdesc: MetaDefinition = {name: 'description', property: 'og:description', content: 'Memozart  vous permet de creer vos propres cartes de révisions.'};
    this.metaService.addTag(ogtitle);
    this.metaService.addTag(ogkeywords);
    this.metaService.addTag(ogdesc);

    this.createCardForm = this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      help: [''],
      theme: ['', [Validators.required]],
      datePresentation: [this.dateMini],
    });

    this.http.get('themes').subscribe({
      next: (data: any) => {
        this.themes = data.body as Theme[];
        this.getSelectedTheme(this.themes[0]?._id);
      },
    });
  }

  onSubmit() {
    if (this.createCardForm.invalid) return;
    const createCardData = this.createCardForm.value;
    createCardData.datePresentation = new Intl.DateTimeFormat([
      'fr',
      'fr',
    ]).format(createCardData.datePresentation);
    this.http.post('cards', createCardData).subscribe({
      next: (res: any) => {
        this.response.successF('Creation OK', res.message);
        this.createCardForm.reset();
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur');
      },
    });
  }

  getSelectedTheme(id: string) {
    this.http.get('themes/' + id).subscribe({
      next: (data: any) => {
        this.theme = data.body;
        this.bgLinearGradient =
          'linear-gradient(' +
          this.theme?.color1 +
          ', ' +
          this.theme?.color2 +
          ')';
        this.designService.changeCustomBgColor(this.bgLinearGradient);
      },
    });
  }
}
