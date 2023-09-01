import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { Theme } from 'src/app/models/theme';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  bucketLandingPage = environment.bucketAdresse + "landing_page/";
  themes!: Theme[];

  constructor(private metaService: Meta, private titleService: Title, private http: HttpService) { }

  ngOnInit(): void {

    const ogtitle: MetaDefinition = { name: 'title', property: 'og:title', content: 'Memozart - L’harmonie parfaite entre l’apprentissage et la mémorisation' };
    const ogkeywords: MetaDefinition = { name: 'keywords', property: 'og:keywords', content: 'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,apprentissage,mémorisation,répétition,apprentissage espacé,landing,' };
    const ogdesc: MetaDefinition = { name: 'description', property: 'og:description', content: 'L’application Memozart est un site web basé sur cet apprentissage espacé. Elle permet à toute personne ou entreprise de créer des cartes de révision qui vont être représentées à des délais plus ou moins espacés.' };

    if (ogtitle.content) this.titleService.setTitle(ogtitle.content);
    this.metaService.addTag(ogtitle);
    this.metaService.addTag(ogkeywords);
    this.metaService.addTag(ogdesc);

    this.http.get('themes').subscribe({
      next: (data: any) => {
        this.themes = data.body as Theme[];
      },
    });

    console.log(this.themes);
  }

  ngOnDestroy() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:keywords'");
  }

}
