import { Card } from './../../models/card';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-manage-card-page',
  templateUrl: './manage-card-page.component.html',
  styleUrls: ['./manage-card-page.component.css'],
})
export class ManageCardPageComponent implements OnInit {
  cards: Card[] = [];
  hoverEdit: boolean = false;
  hoverDel: boolean = false;

  constructor(
    private http: HttpService,
    private confirmationService: ConfirmationService,
    private response: ResponseService
  ) {}

  ngOnInit() {
    this.http.get('cards').subscribe({
      next: (res: any) => {
        this.cards = res.body as Card[];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


  openConfirmDialog = (): void => {
    this.confirmationService.confirm({
      message: 'Es-tu sûr de vouloir supprimer cette carte ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>{
        
      },
    });
  };

  deleteCard(cd :any) {

    this.response.successF(
      'Suppression effectuée',
      'La carte a bien été suprimée'
    );
    cd.close();
  }

  changeBtnStyle(e: any, card: Card, hovered: boolean = false) {
    e.currentTarget.style.boxShadow = hovered
      ? 'inset 3px 3px 4px ' +
        card.theme.darkShadow +
        ', inset -2px -2px 4px ' +
        card.theme.lightShadow +
        ''
      : '2px 2px 4px ' +
        card.theme.darkShadow +
        ', -1px -1px 4px ' +
        card.theme.lightShadow +
        '';
  }
}
