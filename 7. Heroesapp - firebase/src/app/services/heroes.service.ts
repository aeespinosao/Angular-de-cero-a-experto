import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/rx';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesUrl = 'https://heroesapp-3004a.firebaseio.com/heroes.json';
  heroeUrl = 'https://heroesapp-3004a.firebaseio.com/heroes/';
  constructor(private _http: HttpClient) { }

  nuevoHeroe(heroe: Heroe ) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders ({
      'Content-type': 'application/json',
    });

    return this._http.post( this.heroesUrl, body, { headers } );
  }

  actualizarHeroe(heroe: Heroe, key$: string ) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders ({
      'Content-type': 'application/json',
    });
    let url = ` ${this.heroeUrl}/${ key$ }.json`;

    return this._http.put( url, body, { headers } );
  }

  getHeroe( key$: string ){
    let url = `${this.heroeUrl}/${key$}.json`;
    return this._http.get(url);
  }

  getHeroes( ){
    return this._http.get(this.heroesUrl);
  }

  borrarHeroe(k){
    let url = `${this.heroeUrl}/${k}.json`;
    return this._http.delete(url);
  }
}
