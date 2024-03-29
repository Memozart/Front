import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DesignService {
  constructor() { }

  public currentOrganisation: any | undefined = "";

  /**
   * Changement la couleur de fond appelé --custom-bg-color en la couleur en paramètre
   * @param value la couleur voulut
   */
  public changeCustomBgColor(value: string) {
    document.documentElement.style.setProperty('--custom-bg-color', value);
  }

  /**
   * Réinitialise la couleur de fond appelé --custom-bg-color vers son origine
   */
  public resetCustomBgColor() {
    document.documentElement.style.setProperty('--custom-bg-color', '#304562');
  }

  /**
   * Permet à l'utilisateur de passer en thème sombre
   */
  public applyDarkTheme() { }

  /**
   * Permet à l'utilisateur de passer en thème clair
   */
  public applyWhiteTheme() { }

  /**
   * Permet de changer la couleur des boutons en fonction d'un événement
   */
  public changeBtnStyle(
    e: any,
    theme: any,
    option: number,
    hovered: boolean = false
  ) {

    if (e) {

      let target = e.currentTarget;
      if (e.currentTarget.tagName != 'BUTTON') {
        target = e.currentTarget.querySelector('button')
      }

      if (option == 1) {

        target.style.boxShadow = hovered
          ? 'inset 3px 3px 4px ' +
          theme.darkShadow +
          ', inset -2px -2px 4px ' +
          theme.lightShadow +
          ''
          : '2px 2px 4px ' +
          theme.darkShadow +
          ', -1px -1px 4px ' +
          theme.lightShadow +
          '';
      }

      if (option == 2) {
        target.style.boxShadow = hovered
          ? 'inset 3px 3px 4px ' +
          theme.darkShadow +
          ', inset -2px -2px 4px ' +
          theme.lightShadow +
          ''
          : '5px 5px 15px var(--dark-shadow), -5px -5px 15px var(--light-shadow)';
      }
    }


  }
}
