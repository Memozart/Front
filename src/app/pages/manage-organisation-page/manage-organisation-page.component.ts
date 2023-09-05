import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-organisation-page',
  templateUrl: './manage-organisation-page.component.html',
  styleUrls: ['./manage-organisation-page.component.css']
})
export class ManageOrganisationPageComponent {
  showdeleteDialog = false;
  showAddDialog = false;
  addUserOrganisationFormGroup!: FormGroup;

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private fb: FormBuilder,
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

    this.addUserOrganisationFormGroup = this.fb.group({
      userId: new FormControl(''),
    });

  }

  showDialog(isModalAdd: boolean = true) {
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

  }


}
