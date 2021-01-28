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



  getPokemons(): void {
    this.http.get('https://pokeapi.co/api/v2/pokemon/').subscribe((res) => {
      console.log('res 2', res);
      // this.showResult = true;

    }, (error) => {
      console.log('error', error);
    });
  }


  getProducts(): Observable<any[]> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/')
      .pipe(
        tap(product => {
          console.log('fetched products', product.results);
          product.results.forEach((pokemon: Poke) => {
            console.log(pokemon.url);
            this.getPokemon(pokemon.url).subscribe(resp => {
              const res = { ...resp };

              this.pokemons.push(res);
            });
            console.log('pokemons', this.pokemons);
          });
        }),
        catchError(this.handleError('getProducts', []))
      );
  }

  getList(url: string): Observable<any[]> {
    return this.http.get<any>(url)
      .pipe(
        map(product => product),
        catchError(this.handleError('getProducts', []))
      );
  }


  // getPokes(): Observable<any> {
  //   return this.getList()
  //     .pipe(
  //       map(item => {
  //         console.log('item', item)

  //         item.forEach((pokemon) => {
  //           console.log(pokemon.url)
  //           this.http
  //           .get<any>(pokemon.url)
  //           .toPromise()
  //           .then(data => {
  //             this.pokemons.push(data);
  //           });


  //           return this.pokemons;
  //         })




  //       })

  //     );
  // }
  getPokemon(url: string): Observable<object> {

    return this.http.get<any[]>(url)
      .pipe(
        tap(pokemon => {
          // console.log('pokemon', pokemon);
          return pokemon;
        }),
        catchError(this.handleError('getProducts', []))
      );
  }



  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
