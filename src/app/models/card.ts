import { Theme } from './theme';

export interface Card {
  _id: string;
  question: string;
  answer: string;
  help: string;
  theme: Theme;
}
