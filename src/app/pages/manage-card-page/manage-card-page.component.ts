import { Card } from './../../models/card';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-card-page',
  templateUrl: './manage-card-page.component.html',
  styleUrls: ['./manage-card-page.component.css'],
})
export class ManageCardPageComponent implements OnInit {
  cards: Card[] = [];
  constructor(private http: HttpService) {}

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
}
