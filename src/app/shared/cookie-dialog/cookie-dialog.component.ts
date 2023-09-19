import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cookie-dialog',
  templateUrl: './cookie-dialog.component.html',
  styleUrls: ['./cookie-dialog.component.css']
})
export class CookieDialogComponent {
  showCookieDialog! : boolean;
  bucketLandingPage = environment.bucketAdresse + "others/";
  hiddenCookieDialogText = "hiddenCookieDialog";
  dontPrintCookieDialog = false;

  constructor(){
    this.showCookieDialog = localStorage.getItem(this.hiddenCookieDialogText) 
      === 'true' ? false : true;
  }

  changeShowWindowCookie(){
    localStorage.setItem(this.hiddenCookieDialogText, this.dontPrintCookieDialog.toString());
  }
}
