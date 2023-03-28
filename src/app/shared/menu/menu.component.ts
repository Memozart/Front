import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

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

  constructor(private router: Router) {}

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
              localStorage.removeItem('token');
              this.router.navigate(['login']);
            },
          },
        ],
      },
    ];
  }
}
