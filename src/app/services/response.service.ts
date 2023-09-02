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

  public errorF(err: any, title: string) {
    if (err.status === 0) {
      this.messageService.add({ severity: 'error', summary: "Connexion nok", detail: "La connexion n'a pas pu être établie" });
      return;
    } else if (err.status === 401) {
      this.messageService.add({ severity: 'error', summary: "Déconnexion", detail: "Tu as été déconnecté" });
      this.router.navigate([""]);
    } else {
      this.messageService.add({ severity: 'error', summary: title, detail: err.error.message });
    }
  }
}
