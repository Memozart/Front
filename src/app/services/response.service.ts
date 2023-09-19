import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private messageService: MessageService, private router: Router) { }

  public successF(title: string, message: string, life = 5000) {
    this.messageService.add({ severity: 'success', summary: title, detail: message, life });
  }

  public errorF(err: any, title: string, message: string = err.error.message, life = 5000) {
    if (err.status === 0) {
      this.messageService.add({ severity: 'error', summary: "Connexion nok", detail: "La connexion n'a pas pu être établie", life });
      return;
    } else if (err.status === 401) {
      this.messageService.add({ severity: 'error', summary: "Déconnexion", detail: "Tu as été déconnecté", life });
      this.router.navigate([""]);
    } else {
      this.messageService.add({ severity: 'error', summary: title, detail: message , life});
    }
  }
}
