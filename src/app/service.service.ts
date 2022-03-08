import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from './models/hero';
import { environment } from 'src/environments/environment';
import { Abilitie } from './models/abilitie';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient ) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(environment.apiUrl + '/heroes');
  }

  getAbilities(): Observable<Abilitie[]> {
    return this.httpClient.get<Abilitie[]>(environment.apiUrl + '/abilities');
  }

  addAbilitie(): Observable<Abilitie> {
    const abilitie = {
      id: 42,
      name: "The ultimate answer",
      color: "darkslategray",
      hero_id: 1
    }
    return this.httpClient.post<Abilitie>(environment.apiUrl + '/abilities', abilitie);
  }

  deleteAbilitie(): Observable<Abilitie> {
    return this.httpClient.delete<Abilitie>(environment.apiUrl + '/abilities/42');
  }

  saveAbilitie(): Observable<Abilitie> {
    const abilitie = {
      id: 2,
      name: "Clonage des ombres",
      color: "#333",
      hero_id: 1
    }
    return this.httpClient.put<Abilitie>(environment.apiUrl + '/abilities/2', abilitie);
  }

}
