import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-politique-confidentialite',
  templateUrl: './politique-confidentialite.component.html',
  styleUrls: ['./politique-confidentialite.component.css']
})
export class PolitiqueConfidentialiteComponent {
  path = environment.production === true ? '': 'dev.';
  adress = '';
  constructor(){
    this.adress = `https://${this.path}memozart.fr`;
  }
}
