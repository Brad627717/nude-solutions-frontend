import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { InsuredItem } from './models/insured-item';
import { Category } from './models/category';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuredItemApiService {

  readonly insuredItemApiUrl = `${environment.apiUrl}`

  constructor(private http: HttpClient) { }

  getInsuredItems():Observable<InsuredItem[]> {
    return this.http.get<InsuredItem[]>(this.insuredItemApiUrl + '/InsuredItems').pipe(catchError(this.handleError))
  }

  addInsuredItem(data: InsuredItem) {
    return this.http.post(this.insuredItemApiUrl + '/InsuredItems', data).pipe(catchError(this.handleError))
  }

  updateInsuredItem(id: number | string, data: InsuredItem) {
    return this.http.put(this.insuredItemApiUrl + `/InsuredItems/${id}`, data).pipe(catchError(this.handleError))
  }

  removeInsuredItem(id: number | string) {
    return this.http.delete(this.insuredItemApiUrl + `/InsuredItems/${id}`).pipe(catchError(this.handleError))
  }

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(this.insuredItemApiUrl + '/Categories').pipe(catchError(this.handleError))
  }

  addCategory(data: Category) {
    return this.http.post(this.insuredItemApiUrl + '/Categories', data).pipe(catchError(this.handleError))
  }

  updateCategory(id: number | string, data: Category) {
    return this.http.put(this.insuredItemApiUrl + `/Categories/${id}`, data).pipe(catchError(this.handleError))
  }

  removeCategory(id: number | string) {
    return this.http.delete(this.insuredItemApiUrl + `/Categories/${id}`).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('An unexpected error occurred, please try again later.'));
  }
}
