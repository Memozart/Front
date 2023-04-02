import { signOutAction } from './../../stores/user.actions';
import { DesignService } from 'src/app/services/design.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppState } from 'src/app/stores';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

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
  user!: Observable<User>;
  constructor(
    private router: Router,
    public designService: DesignService,
    public store: Store<AppState>
  ) {}

  ngOnInit() {
    this.items = [
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
            label: 'Connexion',
            icon: 'pi pi-fw pi-sign-in',
            routerLink: 'login',
          },
          {
            label: 'Inscription',
            icon: 'pi pi-fw pi-key',
            routerLink: 'register',
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

    this.user = this.store.select((state) => state.user.data);
  }

  concatNameUser(firstname: string | undefined, lastname: string | undefined) {
    if (!firstname || !lastname) return '';
    const firstNameletter = firstname.charAt(0).toUpperCase();
    const lastNameNameletter = lastname.charAt(0).toUpperCase();
    return firstNameletter + lastNameNameletter;
  }
}
