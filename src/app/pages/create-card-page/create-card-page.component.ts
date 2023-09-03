import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';
import { Theme } from 'src/app/models/theme';
import { DesignService } from 'src/app/services/design.service';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

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

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private response: ResponseService,
    public designService: DesignService,
    private metaService: Meta,
    private titleService: Title,
  ) { }

  ngOnDestroy() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:keywords'");

    this.designService.resetCustomBgColor();
  }

  ngOnInit() {
    const ogtitle: MetaDefinition = { name: 'title', property: 'og:title', content: 'Memozart - Crée tes propres cartes de révisions' };
    const ogkeywords: MetaDefinition = { name: 'keywords', property: 'og:keywords', content: 'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,apprentissage,mémorisation,répétition,apprentissage espacé,' };
    const ogdesc: MetaDefinition = {
      name: 'description', property: 'og:description', content: 'Crée facilement tes propres cartes de révision sur Memozart. Personnalise ton apprentissage en concevant des cartes adaptées à tes besoins spécifiques. Prends le contrôle de ton parcours d\'apprentissage avec Memozart dès maintenant !'
    };

    if (ogtitle.content) this.titleService.setTitle(ogtitle.content);
    this.metaService.addTag(ogtitle);
    this.metaService.addTag(ogkeywords);
    this.metaService.addTag(ogdesc);

    this.createCardForm = this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      help: [''],
      theme: ['', [Validators.required]],
      datePresentation: [new Date()],
    });

    this.http.get('themes').subscribe({
      next: (data: any) => {
        this.themes = data.body as Theme[];
        this.getSelectedTheme(this.themes[0]?._id);
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur');
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
        this.response.successF('Carte créée avec succès', 'Tu pourras commencer à la réviser à la date que tu as indiqué ! 😇');
        this.createCardForm.reset();
        this.getSelectedTheme(this.themes[0]?._id);
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
      error: (err: any) => {
        this.response.errorF(err, 'Erreur');
      },
    });
  }
}
