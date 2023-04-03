import { User } from './../models/user';
import { createReducer, on } from '@ngrx/store';
import * as UserAction from './user.actions';
import { Organisation } from '../models/organisation';
/**
 * Notre utilisateur peut avoir des datas associés mais aussi d'autres choses
 */
export interface UserState {
  data: User | undefined;
}

/**
 * déclaration de la valeur de base de l'état de notre utilisateur
 */
export let USER_INITIAL_STATE: UserState | undefined;

/**
 * déclaration de la valeur de base au reducer
 */
export const userReducer = createReducer(
  USER_INITIAL_STATE,
  on(
    UserAction.switchUserOrganisationAction,
    (state: UserState | undefined, { organisation }: { organisation: Organisation }): UserState => {
      return {
        ...state,
        data: { ...state?.data, currentOrganisation: organisation },
      };
    }
  ),
  on(
    UserAction.updateUserAction,
    (state: UserState | undefined, { user }: { user: User }): UserState  => {
      return {
        ...state,
        data: user,
      };
    }
  ),
  on(
    UserAction.signOutAction,
    (state: UserState | undefined): undefined => {
      return undefined;
    }
  ),
);
