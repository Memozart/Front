import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  constructor() { }

  /**
   * Changement la couleur de fond appelé --custom-bg-color en la couleur en paramètre
   * @param value la couleur voulut
   */
  public changeCustomBgColor(value:string){
    document.documentElement.style.setProperty("--custom-bg-color", value);
  }

  /**
   * Réinitialise la couleur de fond appelé --custom-bg-color vers son origine
   */
  public resetCustomBgColor(){
    document.documentElement.style.setProperty("--custom-bg-color", "#304562");
  }

  /**
   * Permet à l'utilisateur de passer en thème sombre
   */
  public applyDarkTheme(){

  }

  /**
   * Permet à l'utilisateur de passer en thème clair
   */
  public applyWhiteTheme(){

  }
}
