import { Action, ActionReducerMap } from "@ngrx/store"
import { userReducer, UserState } from './user.reducer';


/** En résumé:
 * Le store permets d'avoir un seul lieu où les données évolutives du front sont stockés
 * Toutes les souscrits abonnés au store sont automatiquement prévenu quand une donnée évolue 
 * Les données sont appelés les STATS et sont en readonly par toutes l'application.
 * Le seul moyen de modifier ces stats est de passé par des fonctions appelé REDUCER.
 * Le reducer peut faire des ACTIONS
 * Ce sont ces ACTIONS que l'on va codé afin de modifier notre stats
 * Les selectors sont des alias permettant d'accéder de manière intelligente 
 * (possibilité de pipe ) au valeur des stats.
 */

/**
 * On declare ici tous les éléments présent dans notre store
 */
export interface AppState {
  user: UserState // on stocke les informations de l'utilisateur ses datas, ses ...
}

/**
 * On déclara ici tous les reducers qui pourront modifier nos stats
 */
export const ROOT_REDUCER: ActionReducerMap<AppState, Action> = {
  user: userReducer
};

