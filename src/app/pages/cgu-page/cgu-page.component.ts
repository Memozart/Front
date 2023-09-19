import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cgu-page',
  templateUrl: './cgu-page.component.html',
  styleUrls: ['./cgu-page.component.css']
})
export class CguPageComponent {
  path = environment.production === true ? '': 'dev.';
  adress = '';
  constructor(){
    this.adress = `https://${this.path}memozart.fr`;
  }
}
