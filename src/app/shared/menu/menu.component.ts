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
  organisationsSelected?: any;
  showConfirm = false;
  constructor(
    private router: Router,
    public designService: DesignService,
    public store: Store<AppState>,
    private http: HttpService,
    private response: ResponseService,
  ) { }

  ngOnInit() {
    this.store.select(state => state.user?.data).subscribe({
      next: (res: any) => {
        if (!res) {
          this.items = this.MenuNotConnected();
          this.user = undefined;
          return;
        }
        this.items = this.MenuConnected();
        this.user = res;
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
        this.organisationsSelected = this.user?.currentOrganisation?._id;
      },
      error: (err) => {
        console.error('erreur !!',err);
      }
    })
    return [
      {
        label: 'Accueil',
        icon: 'pi pi-fw pi-home',
        routerLink: 'home',
      },
      {
        label: 'Leçons',
        icon: 'pi pi-fw pi-book',
        routerLink: 'card/manage',
      },
      {
        label: 'Ajouter',
        icon: 'pi pi-fw pi-plus',
        routerLink: 'card/create',
      },
      {
        label: 'Compte',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Créer organisation',
            icon: 'pi pi-fw pi-users',
            routerLink: 'organisation/create',
          },
          {
            label: 'Déconnexion',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
              localStorage.clear();
              this.store.dispatch(signOutAction());
              this.router.navigate(['login']);
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
        this.response.successF('OK', "Vous avez changez d'organisation");
        this.showConfirm = false;
        localStorage.setItem('access_token', res.body.accessToken);
        localStorage.setItem('refresh_token', res.body.refreshToken);
        this.router.navigate(['./']);
      },
      error: (err) => {
        this.response.successF('Erreur', "Une erreur à eut lieu pendant le changement d'organisation");
        console.error(err);
        this.showConfirm = false;
      },
    })
  }
}
