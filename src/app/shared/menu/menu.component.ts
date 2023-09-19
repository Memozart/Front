import { HttpService } from './../../services/http.service';
import { signOutAction, updateUserAction } from './../../stores/user.actions';
import { DesignService } from 'src/app/services/design.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppState } from 'src/app/stores';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { Organisation } from 'src/app/models/organisation';
import { ResponseService } from 'src/app/services/response.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  /**
   * Nom des composants du menu.
   */
  items!: MenuItem[];
  user?: User;
  organisations?: Organisation[];
  organisation!: Organisation;
  organisationsSelected?: any;
  showOrganisation: boolean = false;
  showConfirm = false;
  manageableOrganisation: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    public designService: DesignService,
    public store: Store<AppState>,
    private http: HttpService,
    private response: ResponseService,
    private configService : ConfigService
  ) { }

  ngOnInit() {

    this.store.select(state => state.user?.data).subscribe({
      next: (res: any) => {

        if (!res) {
          this.items = this.MenuNotConnected();
          this.user = undefined;
          return;
        }

        this.user = res;

        this.http.get('organisations/' + this.user?.currentOrganisation?._id).subscribe({
          next: (res: any) => {

            this.organisation = res.body;
            this.isAdmin = this.organisation.admin.find(id => id.toString() === this.user?._id) !== undefined;

            if (this.isAdmin && this.organisation.accountTypeId != 1) this.manageableOrganisation = true;
            else this.manageableOrganisation = false;

            this.items = this.MenuConnected();

          },
          error: (err: any) => {
            this.response.errorF(err, 'Erreur');
          },
        });

      },
      error: (err: any) => {
        console.error(err);
      },
    })
  }

  concatNameUser(firstname: string | undefined, lastname: string | undefined) {
    if (!firstname || !lastname) return '';
    const firstNameletter = firstname.charAt(0).toUpperCase();
    const lastNameNameletter = lastname.charAt(0).toUpperCase();
    return firstNameletter + lastNameNameletter;
  }

  MenuConnected() {
    this.http.get('organisations').subscribe({
      next: (res: any) => {
        this.organisations = res.body;
        this.showOrganisation = this.organisations!.length > 1 ? true : false;
        this.organisationsSelected = this.user?.currentOrganisation?._id;
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur');
      },
    })
    return [
      {
        label: 'Révisions',
        icon: 'pi pi-fw pi-home',
        routerLink: 'home',
      },
      {
        label: 'Cartes',
        icon: 'pi pi-fw pi-book',
        routerLink: 'card/manage',
        visible: this.isAdmin
      },
      {
        label: 'Ajouter',
        icon: 'pi pi-fw pi-plus',
        routerLink: 'card/create',
        visible: this.isAdmin
      },
      {
        label: 'Compte',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Créer organisation',
            icon: 'pi pi-fw pi-plus',
            routerLink: 'organisation/create',
          },
          {
            label: 'Gérer organisation',
            icon: 'pi pi-fw pi-users',
            routerLink: 'organisation/manage',
            visible: this.manageableOrganisation,
          },
          {
            label: 'Mon compte',
            icon: 'pi pi-cog',
            routerLink: 'account',
          },
          {
            label: 'Déconnexion',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
              this.configService.logoutBehavior();
            },
          },
        ],
      },
    ];
  }

  MenuNotConnected() {
    return [
      {
        label: 'Connexion',
        icon: 'pi pi-fw pi-sign-in',
        routerLink: 'login',
      },
      {
        label: 'Inscription',
        icon: 'pi pi-fw pi-key',
        routerLink: 'register',
      },
    ];
  }

  cancelChangeOrganisation() {
    //reset select box + fermeturee confirm
    this.showConfirm = false;
    this.organisationsSelected = this.user?.currentOrganisation?._id;
  }

  confirmChangeOrganisation() {


    if (this.organisationsSelected === this.user?.currentOrganisation?._id)
      return;
    this.http.update('users/change-current-organisation', undefined, { organisationId: this.organisationsSelected }).subscribe({
      next: (res: any) => {
        this.store.dispatch(updateUserAction({ user: res.body.user }));
        this.response.successF('Changement d\'organisation opéré', "Prêt à reprendre où tu t'étais arrêté ? 🤨");
        this.showConfirm = false;
        localStorage.setItem('access_token', res.body.accessToken);
        localStorage.setItem('refresh_token', res.body.refreshToken);
        this.router.navigate(['./']);
      },
      error: (err: any) => {
        this.response.errorF('Erreur', "Une erreur a eu lieu pendant le changement d'organisation.");
        this.showConfirm = false;
      },
    })
  }
}
