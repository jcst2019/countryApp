// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CountriesService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStorage } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string='https://restcountries.com/v3.1';

  public cacheStore:CacheStorage={
    byCapital:  { term:'', countries:[] },
    byCountries:{ term:'', countries:[] },
    byRegion:   { region:'', countries:[] },
  }

  constructor(private http: HttpClient) { }

  private getHttpCountriesRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( error => of([])),
        // delay(2000)// Para probar el loading SOLO coloco de forma temporal para que demore 2 segundos en pintar el resultado en pantalla.
    );
  }

  searchCountryByAlphaCode(code:string):Observable<Country | null>{

    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null ),
      catchError(error => of(null)) // Devuelve null en lugar de un array vacío
    );


  }

searchCapital(term: string):Observable<Country[]>{

  const url = `${this.apiUrl}/capital/${term}`
  return this.getHttpCountriesRequest(url)
  .pipe(
    // tap(countries => this.cacheStore.byCapital ={term:term,countries:countries})
    tap(countries => this.cacheStore.byCapital ={term,countries}) // En EMS6 un valor de un objeto que apunta al valor de una variable que tiene el mismo nomnbre entonces se reduce a =>
  );

  // return this.http.get<Country[]>(url);
  // return this.http.get<Country[]>(url)
  // .pipe(
  //   catchError( error => of([]))
  // );

  // .pipe(
  //   tap( countries => console.log('Paso por el tap',countries)),
  //   map(countries => []),
  //   tap(countries => console.log('Paso por el tap',countries))
  // );
}


searchCountry(term: string):Observable<Country[]>{

  const url = `${this.apiUrl}/name/${term}`

  return this.getHttpCountriesRequest(url)
  .pipe(
    // tap(countries => this.cacheStore.byCapital ={term:term,countries:countries})
    tap(countries => this.cacheStore.byCountries ={term,countries}) // En EMS6 un valor de un objeto que apunta al valor de una variable que tiene el mismo nomnbre entonces se reduce a =>
  );

  // return this.http.get<Country[]>(url)
  // .pipe(
  //   catchError( error => of([]))
  // );
 
}

searchRegion(region: Region):Observable<Country[]>{

  const url = `${this.apiUrl}/region/${region}`

  return this.getHttpCountriesRequest(url)
  .pipe(
    // tap(countries => this.cacheStore.byCapital ={term:term,countries:countries})
    tap(countries => this.cacheStore.byRegion ={region,countries}) // En EMS6 un valor de un objeto que apunta al valor de una variable que tiene el mismo nomnbre entonces se reduce a =>
  );
  // return this.http.get<Country[]>(url)
  // .pipe(
  //   catchError( error => of([]))
  // );
 
}

  
}
