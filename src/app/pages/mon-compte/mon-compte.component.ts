import { Component } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent {
  visible = false;

  constructor(
    private httpService : HttpService,
    private response: ResponseService,
    private configService : ConfigService
    ){}

  deleteAccount(){
    this.httpService.deleteWithoutParam("users").subscribe({
      next : (res) => {
        this.response.successF('Compte supprimé','votre compte à été supprimer avec succès');
        this.configService.logoutBehavior();
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur');
      },
    })
  }
}
