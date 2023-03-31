import { Card } from './../../models/card';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';
import { DesignService } from 'src/app/services/design.service';

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
    private response: ResponseService,
    public designService: DesignService
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
      accept: () => this.acceptFunc(),
    });
  };

  acceptFunc() {
    this.response.successF(
      'Suppression effectuée',
      'La carte a bien été suprimée'
    );
  }
}
