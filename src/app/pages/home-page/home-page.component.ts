import { Component } from '@angular/core';
import { DesignService } from 'src/app/services/design.service';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  themes!: any;
  constructor(private http: HttpService, private response: ResponseService, private titleService: Title, public designService: DesignService, private metaService: Meta) { }

  ngOnInit() {
    const ogtitle: MetaDefinition = { name: 'title', property: 'og:title', content: 'Memozart - Tableau de bord des révisions' };
    const ogkeywords: MetaDefinition = { name: 'keywords', property: 'og:keywords', content: 'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,apprentissage,mémorisation,répétition,apprentissage espacé,home,accueil,entreprise,' };
    const ogdesc: MetaDefinition = {
      name: 'description', property: 'og:description', content: 'Explore ton tableau de bord des révisions personnalisé sur Memozart. Suis tes progrès et optimise ton apprentissage grâce à notre outil intuitif d\'apprentissage espacé.'
    };

    if (ogtitle.content) this.titleService.setTitle(ogtitle.content);
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
      error: (err: any) => {
        this.response.errorF(err, 'Erreur');
      },
    });
  }
}
