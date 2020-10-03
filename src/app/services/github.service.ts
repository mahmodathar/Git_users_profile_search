import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CLIENT_ID, CLIENT_SECRET } from '../credentials/GithubCred';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) {}

  // for Github profile
    public getProfile(searchQuery): Observable<any[]>{
      const url = `https://api.github.com/users/${searchQuery}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
      return this.http.get<any[]>(url).pipe(
        retry(1),
        catchError(this.handleErrors)
        );
  }

  // for Github repos
  public getRepos(searchQuery): Observable<any[]>{
    const url = `https://api.github.com/users/${searchQuery}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}}`;
    return this.http.get<any>(url).pipe(
      retry(1),
      catchError(this.handleErrors)
      );
}


  // tslint:disable-next-line: typedef
  public handleErrors(error: HttpErrorResponse){
    let errorMassage: string;
    if (error.error instanceof ErrorEvent){
      // client side error
      errorMassage = 'MASSAGE : ${error.error.massage}';
    }
    else{
      // server side error
      errorMassage = 'STATUS : ${error.status} MASSAGE : ${error.massage}';
    }
    return throwError(errorMassage);
  }
}

