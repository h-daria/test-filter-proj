import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCatsService {
  endpointUrl: string = 'https://api.thecatapi.com/v1';
  publicKey = 'd9ec60fa-716e-4975-b0e5-31cfcbf5edda';
  params = `api_key=${this.publicKey}`

  constructor(private http: HttpClient) { }

  getBreeds(order: string): Observable<any> {
    return this.http.get<any>(`${this.endpointUrl}/breeds?${this.params}&order=${order}`)
    .pipe(
      catchError(this.handleError('getBreedsPic', []))
    );
  }

  searchByBreed(breedId: string, limit: string): Observable<any> {
    return this.http.get<any>(`${this.endpointUrl}/images/search?${this.params}&breed_id=${breedId}&limit=${limit}&page=0`)
    .pipe(
      catchError(this.handleError('getBreeds', []))
    );
  }

  searchImages(limit: string) {
    return this.http.get<any>(`${this.endpointUrl}/images/search?${this.params}&limit=${limit}&page=0`)
    .pipe(
      catchError(this.handleError('getBreeds', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}