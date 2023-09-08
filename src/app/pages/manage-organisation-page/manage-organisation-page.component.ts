import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-manage-organisation-page',
  templateUrl: './manage-organisation-page.component.html',
  styleUrls: ['./manage-organisation-page.component.css']
})
export class ManageOrganisationPageComponent {
  showdeleteDialog = false;
  showAddDialog = false;
  addUserOrganisationFormGroup!: FormGroup;
  organisationId: any;
  organisation!: any;
  userSelectedId!: string;

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpService,
    private response: ResponseService,
  ) { }

  ngOnDestroy() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:keywords'");
  }

  ngOnInit() {
    const ogtitle: MetaDefinition = { name: 'title', property: 'og:title', content: 'Memozart - Gère ton organisation' };
    const ogkeywords: MetaDefinition = { name: 'keywords', property: 'og:keywords', content: 'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,apprentissage,mémorisation,répétition,apprentissage espacé,home,accueil,entreprise,management,' };
    const ogdesc: MetaDefinition = {
      name: 'description', property: 'og:description', content: 'Gère facilement ton organisation sur Memozart. Invite de nouveaux membres et collabore efficacement. Optimise ton expérience de travail en équipe dès maintenant !'
    };

    if (ogtitle.content) this.titleService.setTitle(ogtitle.content);
    this.metaService.addTag(ogtitle);
    this.metaService.addTag(ogkeywords);
    this.metaService.addTag(ogdesc);

    this.getOrganisationById();

    this.addUserOrganisationFormGroup = this.fb.group({
      userIdAdded: ['', [Validators.required]],
    });

  }

  getOrganisationById = () => {
    this.http.get('organisations/users/all').subscribe({
      next: (res: any) => {
        if (!res.body) this.router.navigate(['./home']);
        this.organisation = res.body;
        if (this.organisation.accountUserLimit < 2) this.router.navigate(['./home']);
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur');
        this.router.navigate(['./home']);
      },
    });
  };

  showDialog(isModalAdd: boolean, userId: null | string = null) {

    if (userId) this.userSelectedId = userId;

    if (!isModalAdd) {
      this.showAddDialog = false;
      this.showdeleteDialog = true;
      return;
    }

    this.showdeleteDialog = false;
    this.showAddDialog = true;

  }

  closeDialog() {
    this.showAddDialog = false;
    this.showdeleteDialog = false;
  }

  addUserOrganisation() {
    if (this.addUserOrganisationFormGroup.invalid || this.addUserOrganisationFormGroup === null) {
      this.showAddDialog = false;
      return;
    }

    const addUserOrganisationFormGroup = this.addUserOrganisationFormGroup.value;

    this.http.update('organisations/join', this.organisation._id, addUserOrganisationFormGroup).subscribe({
      next: (res: any) => {

        this.organisation = res.body;

        this.closeDialog();
        this.addUserOrganisationFormGroup.reset();
        this.response.successF(
          'Ajout effectué',
          'Tadaaaaa ! 😎'
        );
      },
      error: (err) => {
        console.log(err);
        this.closeDialog();
        this.response.errorF(
          err,
          'Une erreur a eu lieu pendant la mise à jour de la carte'
        );
      },
    });

  }

  deleteUserOrganisation() {
    if (!this.userSelectedId) return;

    this.http.update('organisations/leave', this.organisation._id, { 'userIdDeleted': this.userSelectedId }).subscribe({
      next: (res: any) => {

        this.organisation = res.body;

        this.response.successF(
          'Suppression effectuée',
          'Bon débarras... 😏'
        );
        this.closeDialog();
      },
      error: (err: any) => {
        console.log(err);
        this.response.errorF(
          err,
          'Une erreur à eu lieu pendant la suppression du collaborateur'
        );
        this.closeDialog();
      },
    });
  }


}
