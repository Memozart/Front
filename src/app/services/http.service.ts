import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Service pour effectuer des requêtes HTTP à l'API.
 * @class HttpService
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.AdresseAPI;

  constructor(private http: HttpClient) { }


  /**
  * Effectue une requête HTTP GET à l'URL spécifiée.
  * @param {string} path - La route qui doit interroger.
  * @returns {Observable<any>} - Un observable pour la réponse HTTP.
  */
  get(path: string) {
    return this.http.get(`${this.baseUrl}${path}`);
  }

  /**
 * Effectue une requête HTTP GET à l'URL spécifiée avec des paramètres de filtre.
 * @param {string} path - Le chemin d'accès relatif de l'URL à récupérer.
 * @param {string} filterValue - La valeur du filtre à appliquer à la requête.
 * @returns {Observable<any>} - Un observable pour la réponse HTTP.
 */
  getFilteredData(path: string, filterValue: string) {
    const params = new HttpParams().set('filter', filterValue);
    return this.http.get(`${this.baseUrl}${path}`, { params });
  }

  /**
 * Effectue une requête HTTP POST à l'URL spécifiée avec les données fournies.
 * @param {string} path - La route qui doit interroger.
 * @param {any} body - Le corps de la requête HTTP POST.
 * @returns {Observable<any>} - Un observable pour la réponse HTTP.
 */
  post(path: string, body: any) {
    return this.http.post(`${this.baseUrl}${path}`, body);
  }

  /**
 * Effectue une requête HTTP PUT à l'URL spécifiée et mets à jour une ressource avec les nouvelles données.
 * @param {string} path - Le chemin d'accès relatif de l'URL à mettre à jour.
 * @param {any} body - Les nouvelles données à utiliser pour mettre à jour la ressource.
 * @returns {Observable<any>} - Un observable pour la réponse HTTP.
 */
  update(path: string, body: any) {
    return this.http.put(`${this.baseUrl}${path}`, body);
  }

  /**
 * Effectue une requête HTTP DELETE à l'URL spécifiée.
 * @param {string} path - Le chemin d'accès relatif de l'URL à supprimer.
 * @param {string} id - L'identifiant de la ressource à supprimer.
 * @returns {Observable<any>} - Un observable pour la réponse HTTP.
 */
  delete(path: string, id: number) {
    return this.http.delete(`${this.baseUrl}${path}/${id}`);
  }
}
