import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { forEachChild } from 'typescript';


export interface Config {
  cont: string;
  next: string;
  previus: string;
  results: [];
  key: any;
}

export interface Poke {
  url: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetPokemonsService {

  constructor(private http: HttpClient) { }

  pokemons = [] as any[];
  result = [] as Config[];

  getList(url: string): Observable<any[]> {
    return this.http.get<any>(url)
      .pipe(
        map(product => product),
        catchError(this.handleError('list', []))
      );
  }


  getPokemon(url: string): Observable<object> {
    return this.http.get<any[]>(url)
      .pipe(
        tap(pokemon => {
          // console.log('pokemon', pokemon);
          return pokemon;
        }),
        catchError(this.handleError('pokemon', []))
      );
  }



  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      if (operation == 'list'){
        throw new Error('My Error');
      }
      
      return of(result as T);
      // return of(result as T);
    };
  }
}
