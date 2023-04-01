import { User } from './../models/user';
import { createReducer, on } from '@ngrx/store';
import * as UserAction from './user.actions';
import { Organisation } from '../models/organisation';
/**
 * Notre utilisateur peut avoir des datas associés mais aussi d'autres choses
 */
export interface UserState {
  data: User;
}

/**
 * déclaration de la valeur de base de l'état de notre utilisateur
 */
export const USER_INITIAL_STATE = {
  data: {
    _id: 'user id',
    email: 'N/A',
    firstName: 'N/A',
    lastName: 'N/A',
    currentOrganisation: {
      _id: 'organisation id',
      name: 'N/A',
    },
  } as User,
};

/**
 * déclaration de la valeur de base au reducer
 */
export const userReducer = createReducer(
  USER_INITIAL_STATE,
  on(
    UserAction.switchUserOrganisationAction,
    (state: UserState, { organisation }: { organisation: Organisation }): UserState => {
      return {
        ...state,
        data: { ...state.data, currentOrganisation : organisation },
      };
    }
  ),
  on(
    UserAction.updateUserAction,
    (state: UserState, { user }: { user: User }): UserState => {
      return {
        ...state,
        data: user,
      };
    }
  ),
);
