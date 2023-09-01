import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-organisation-page',
  templateUrl: './organisation-page.component.html',
  styleUrls: ['./organisation-page.component.css'],
})
export class OrganisationPageComponent {
  createOrganisationForm!: FormGroup;
  typesAccount = [
    { type: 2, name: 'enterprise' },
    { type: 3, name: 'prenium' },
    { type: 4, name: 'gold' },
  ];
  constructor(private fb: FormBuilder,
    private response: ResponseService,
    private http: HttpService,
    private metaService: Meta,
    private titleService: Title) { }

  ngOnInit() {
    const ogtitle: MetaDefinition = { name: 'title', property: 'og:title', content: 'Memozart - Crée ton organisation' };
    const ogkeywords: MetaDefinition = { name: 'keywords', property: 'og:keywords', content: 'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,apprentissage,mémorisation,répétition,apprentissage espacé,home,accueil,entreprise,organisation' };
    const ogdesc: MetaDefinition = {
      name: 'description', property: 'og:description', content: 'Crée ton organisation sur Memozart et facilite la collaboration. Gère tes cartes de révision en équipe, partage des ressources et optimise l\'apprentissage ensemble.Transforme ton expérience d\'apprentissage avec Memozart dès aujourd\'hui!'
    };

    if (ogtitle.content) this.titleService.setTitle(ogtitle.content);
    this.metaService.addTag(ogtitle);
    this.metaService.addTag(ogkeywords);
    this.metaService.addTag(ogdesc);

    this.createOrganisationForm = this.fb.group({
      name: ['', [Validators.required]],
      type: [2, [Validators.required]],
    });
  }
  ngOnDestroy() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:keywords'");
  }

  onSubmit() {
    if (this.createOrganisationForm.invalid) return;
    this.http
      .post('organisations', this.createOrganisationForm.value)
      .subscribe({
        next: (res: any) => {
          this.response.successF("Creation OK", "La creation de l'organisation a reussi, veuillez vous déconnecter et vous reconnecter pour voir les changements", 10_000);
          this.createOrganisationForm.reset();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
}
