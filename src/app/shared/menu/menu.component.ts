import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  /**
   * Nom des composants du menu.
   */
  items!: MenuItem[];

  constructor(private router: Router){}

  ngOnInit() {
    this.items = [
      {
        label: 'landing page',
        icon: 'pi pi-check',
        routerLink: ""
      },
      {
        label: 'home ',
        icon: 'pi pi-fw pi-pencil',
        routerLink: "home"
      },
      {
        label: 'inscription ',
        icon: 'pi pi-spin pi-apple',
        routerLink: "register"
      },
      {
        label: 'connexion',
        icon: 'pi pi-fw pi-lock',
        routerLink: "login"
      },
      {
        label: 'creation cartes',
        icon: 'pi pi-fw pi-pencil',
        routerLink: "card/create"
      },
      {
        label: 'Gestion des cartes',
        icon: 'pi pi-fw pi-pencil',
        routerLink: "card/manage"
      },
      {
        label: 'revision',
        icon: 'pi pi-fw pi-pencil',
        routerLink: "card/review"
      },
      {
        label: 'logout',
        icon: 'pi pi-fw pi-power-off',
        command : ()=>{
          localStorage.removeItem("token");
          this.router.navigate(['login'])
        }
      }
    ];
  }

}
