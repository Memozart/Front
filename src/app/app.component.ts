import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memozartFront';
  version = environment.appVersion;
  environmentName = environment.nomEnvironnement;

  
}


