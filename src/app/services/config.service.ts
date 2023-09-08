import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  stepSequence = environment.isDemo ? 
  {
    timeSequence: 'minute(s)'
  }:
  {
    timeSequence: 'jour(s)'
  }
}
