import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Card } from './../../models/card';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { ResponseService } from 'src/app/services/response.service';
import { Theme } from 'src/app/models/theme';
import { DesignService } from 'src/app/services/design.service';

@Component({
  selector: 'app-manage-card-page',
  templateUrl: './manage-card-page.component.html',
  styleUrls: ['./manage-card-page.component.css'],
})
export class ManageCardPageComponent implements OnInit {
  cards: Card[] = [];
  themes: Theme[] = [];
  selectedCard?: Card;
  showUpdateDialog = false;
  showdeleteDialog = false;
  updateCardFormGroup!: FormGroup;
  theme!: Theme;
  bgLinearGradient!: string;
  selectedTheme!: string;

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private response: ResponseService,
    public designService: DesignService
  ) {}

  ngOnDestroy() {
    this.designService.resetCustomBgColor();
  }

  ngOnInit() {
    this.updateCardFormGroup = this.fb.group({
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
      theme: new FormControl('', [Validators.required]),
      help: new FormControl(''),
    });

    this.http.get('themes').subscribe({
      next: (res: any) => {
        this.themes = res.body as Theme[];
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.http.get('cards').subscribe({
      next: (res: any) => {
        this.cards = res.body as Card[];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showDialog(card: Card, isModalUpdate: boolean = true) {
    this.selectedCard = card;
    this.getSelectedTheme(this.selectedCard.theme._id);
    if (!isModalUpdate) {
      this.showUpdateDialog = false;
      this.showdeleteDialog = true;
      return;
    }

    this.showdeleteDialog = false;
    this.showUpdateDialog = true;
    this.updateCardFormGroup.setValue({
      question: card.question,
      answer: card.answer,
      theme: card.theme._id,
      help: card.help,
    });
  }

  updateCard() {
    if (this.updateCardFormGroup.invalid || this.selectedCard === null) {
      this.showUpdateDialog = false;
      this.designService.resetCustomBgColor();
      return;
    }

    const cardData = this.updateCardFormGroup.value;
    this.http.update('cards', this.selectedCard!._id, cardData).subscribe({
      next: (res: any) => {
        const foundIndex = this.cards.findIndex(
          (x) => x._id === this.selectedCard!._id
        );
        this.cards[foundIndex] = res.body;
        this.closeModal();
        this.response.successF(
          'Mise à jour effectuée',
          'La carte a bien été mise à jour'
        );
      },
      error: (err) => {
        console.log(err);
        this.closeModal();
        this.response.errorF(
          err,
          'Une erreur a eu lieu pendant la mise à jour de la carte'
        );
      },
    });
  }

  deleteCard() {
    if (!this.selectedCard) return;

    this.http.delete('cards', this.selectedCard._id).subscribe({
      next: (res: any) => {
        this.cards = this.cards.filter(
          (card) => card._id !== this.selectedCard?._id
        );
        this.response.successF(
          'Suppression effectuée',
          'La carte a bien été suprimée'
        );
        this.closeModal();
      },
      error: (err) => {
        console.log(err);
        this.response.errorF(
          err,
          'Une erreur à eut lieu pendant la suppression de la carte'
        );
        this.closeModal();
      },
    });
  }

  /**
   * Permets de fermer toutes les modals de la pages
   */
  closeModal() {
    this.selectedCard = undefined;
    this.showUpdateDialog = false;
    this.showdeleteDialog = false;
    this.designService.resetCustomBgColor();
  }

  getSelectedTheme(id: string) {
    this.http.get('themes/' + id).subscribe({
      next: (data: any) => {
        this.theme = data.body;
        this.bgLinearGradient =
          'linear-gradient(' +
          this.theme.color1 +
          ', ' +
          this.theme.color2 +
          ')';
        this.designService.changeCustomBgColor(this.bgLinearGradient);
      },
    });
  }
}
