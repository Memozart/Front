import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meta,MetaDefinition } from '@angular/platform-browser';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  bucketLandingPage = environment.bucketAdresse + "landing_page/";
  constructor( private metaService:Meta) {}

  ngOnInit(): void {
    
    const ogtitle: MetaDefinition =  { name: 'title',property: 'og:title', content: 'Memozart -  L’harmonie parfaite entre l’apprentissage et la mémorisation'};
    const ogkeywords: MetaDefinition = {name: 'keywords',property: 'og:keywords', content:'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,apprentissage,mémorisation,répétition,apprentissage espacé,landing,'};
    const ogdesc: MetaDefinition = {name: 'description', property: 'og:description', content: 'L’application Memozart est un site web basé sur cet apprentissage espacé. Elle permet à toute personne ou entreprise de créer des cartes de révision qui vont être représentées à des délais plus ou moins espacés.'};
    this.metaService.addTag(ogtitle);
    this.metaService.addTag(ogkeywords);
    this.metaService.addTag(ogdesc);
  }
  
  ngOnDestroy() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:keywords'");
   }
}
