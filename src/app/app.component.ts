import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memozartFront';
  version = environment.appVersion;
  environmentName = environment.nomEnvironnement;
  constructor(private messagingService: MessagingService) {
    this.messagingService.requestPermission();
    this.messagingService.listenToMessages();
  }
}


