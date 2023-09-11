import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  statut: string = "success";
  hash: string = "";
  constructor(private route: ActivatedRoute, private http: HttpService, private response: ResponseService) { }


  ngOnInit(): void {
    this.statut = this.route.snapshot.paramMap.get('statut') || "success";
    this.hash = this.route.snapshot.queryParamMap.get('hash') || "";
    if(this.statut === "success") {
      this.sendHash();
    }
  }

  sendHash() {
    this.http.post('organisations/valid_payment', {hash: this.hash}).subscribe({
      next: (data: any) => {
          this.response.successF("Organisation créée avec succès", "Ton organisation est maintenant opérationnelle ! Il te suffit de te reconnecter pour voir les changements. Prêt à commencer l'aventure ? 🚀", 10_000);
      },
      error: (error: any) => {
        this.response.errorF(error, "Erreur lors de la création de l'organisation", "Une erreur est survenue lors de la création de l'organisation. Veuillez réessayer plus tard ou contacter le support.")
      }
    });
  }


}
