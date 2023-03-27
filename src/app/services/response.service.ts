import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private messageService: MessageService, private router: Router) { }

  public successF(title: string, message: string) {
    this.messageService.add({ severity: 'success', summary: title, detail: message });
  }

  public errorF(err: any, title: string) {
    if (err.status === 0) {
      this.messageService.add({ severity: 'error', summary: "connexion nok", detail: "la connexion n'as pas pu être établie" });
      return;
    }
    if (err.status === 401) {
      this.messageService.add({ severity: 'error', summary: "Déconnexion", detail: "vous avez été déconnecter veuille vous reconnecter" });
      this.router.navigate([""]);
    }

    this.messageService.add({ severity: 'error', summary: title, detail: err.error.message });
  }
}
