import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-organisation-page',
  templateUrl: './organisation-page.component.html',
  styleUrls: ['./organisation-page.component.css'],
})
export class OrganisationPageComponent {
  createOrganisationForm!: FormGroup;
  typesAccount = [
    { type: 2, name: 'enterprise' },
    { type: 3, name: 'prenium' },
    { type: 4, name: 'gold' },
  ];
  constructor(private fb: FormBuilder, 
    private response: ResponseService,
    private http: HttpService) {}

  ngOnInit() {
    this.createOrganisationForm = this.fb.group({
      name: ['', [Validators.required]],
      type: [2, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.createOrganisationForm.invalid) return;
    this.http
      .post('organisations', this.createOrganisationForm.value)
      .subscribe({
        next: (res: any) => {
          this.response.successF("Creation OK", "La creation de l'organisation a reussi, veuillez vous déconnecter et vous reconnecter pour voir les changements",10_000);
          this.createOrganisationForm.reset();
        },
        error: (err: any) => {
          console.error(err);
        },
    });
  }
}
