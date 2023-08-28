import { Component } from '@angular/core';
import { DesignService } from 'src/app/services/design.service';
import { HttpService } from 'src/app/services/http.service';
import { Meta,MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  themes!: any;
  constructor(private http: HttpService, public designService: DesignService, private metaService:Meta) {}

  ngOnInit() {
    const ogtitle: MetaDefinition =  { name: 'title',property: 'og:title', content: 'Bienvenue sur Memozart, l’application révolutionnaire pour des apprentissages durables ! Créez vos propres cartes de révision et maîtrisez l’art de l’apprentissage espacé.'};
    const ogkeywords: MetaDefinition = {name: 'keywords',property: 'og:keywords', content:'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,apprentissage,mémorisation,répétition,apprentissage espacé,home,accueil,entreprise,'};
    const ogdesc: MetaDefinition = {name: 'description', property: 'og:description', content: 'L’application Memozart est un site web basé sur cet apprentissage espacé. Elle permet à toute personne ou entreprise de créer des cartes de révision qui vont être représentées à des délais plus ou moins espacés.'};
    this.metaService.addTag(ogtitle);
    this.metaService.addTag(ogkeywords);
    this.metaService.addTag(ogdesc);

    this.getAllThemes();
  }

  ngOnDestroy() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:keywords'");
   }

  getAllThemes() {
    this.http.get('stats/reviews-of-all-themes').subscribe({
      next: (res: any) => {
        this.themes = res.body;
      },
    });
  }
}
