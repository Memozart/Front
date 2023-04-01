import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';
import { Organisation } from '../models/organisation';

export const updateUserAction = createAction(
  '[ user ] update User',
  props<{ user: User }>()
);
export const switchUserOrganisationAction = createAction(
  '[ user ] switch user organisation',
  props<{ organisation: Organisation }>()
);
